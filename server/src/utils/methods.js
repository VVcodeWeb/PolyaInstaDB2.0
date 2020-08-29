//libs
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//functions
const { db } = require("./firebase");
const USER_REF = db.collection("users");
const ACCOUNT_REF = db.collection("accounts");

const ACCOUNT_RPOPERTIES = [
  "url",
  "theme",
  "product",
  "cost",
  "reach",
  "TA",
  "subscribersIncome",
  "cost",
  "percentTAgeo",
  "percentTAsex",
  "percentTAage",
  "blackList",
  "blackListReasonDescription",
  "description",
];
const INSTAGRAM_PREFIX_SIZE = 26;
// -----------------------------Accounts----------------------------
const AccountMethods = {
  getAllAccounts: async () => {
    const accounts = await ACCOUNT_REF.get();
    return accounts.docs.map((item) => item.data());
  },
  convertUrlToName: (url) => url.substring(26).replace(/\/$/, ""),
  createAccount: (body) => {
    var account = body;
    account.percentTAgeo = parseInt(account.percentTAgeo) || NaN;
    account.percentTAsex = parseInt(account.percentTAsex) || NaN;
    account.percentTAage = parseInt(account.percentTAage) || NaN;
    account.cost = parseInt(account.cost) || NaN;
    values = AccountMethods.calculateReachTAsubscriberCost(body);
    account = { ...account, ...values, createdAt: new Date().toISOString() };
    return account;
  },
  calculateReachTAsubscriberCost: (body) => {
    const TA =
      (
        ((((body.percentTAgeo / 100) * body.percentTAage) / 100) *
          body.percentTAsex) /
        100
      ).toFixed(2) || 0;
    const costReach = (body.cost / body.reach).toFixed(2) || 0;
    const costReachTA = (body.cost / (body.reach * TA)).toFixed(2) || 0;
    const subscriberCost = (body.cost / body.subscribersIncome).toFixed(2) || 0;
    return { TA, costReach, costReachTA, subscriberCost };
  },
  validateUrl: async (url) => {
    if(url.length <= 25) throw new Error("Url is too short")
    const instagramUrl = "https://www.instagram.com/";
    const givemInstagramUrl = url.substring(0, INSTAGRAM_PREFIX_SIZE);
    if (!(instagramUrl === givemInstagramUrl)) {
      throw new Error(
          "You only can use instagram blogers for this database, please make sure ulr has 'https://www.instagram.com/'. "
        );
    }
  },
  checkIfIdIsAlreadyInDB: async (id) => {
    const account = await ACCOUNT_REF.doc(id).get();
    if (account.exists) {
      throw new Error(
        `Account with following url is already in the database: ${
          account.data().url
        }. `
      );
    }
  },
  clearGivenUrl: (url) => {
    try{
      url = url.replace(/ /g, "");
      if (url.replace(/[^/]/g, "").length > 3) {
        url = url.substring(0, url.lastIndexOf("/"));
      }
      return url;
    } catch (e){
      throw new Error("Cant clean url, its most likely unvalid")
    }
    
  },
  extractValidAccountsFromArray: async (accounts) => {
    const defectedAccounts = [];
    let addedAccounts = accounts.length;
    const allAccounts = await Promise.all(
      accounts.map(async (account) => {
        if (account.hasOwnProperty("url")){
          try {
            account.url = AccountMethods.clearGivenUrl(account.url);     
          } catch (error) {
            addedAccounts--;
            defectedAccounts.push({account, reason: error.message})
          } 
          try {
            await AccountMethods.validateUrl(account.url);
          } catch (e) {
            addedAccounts--;
            defectedAccounts.push({ account, reason: "Url is not valid" });
            return;
          }
          try {
            const newAccountID = AccountMethods.convertUrlToName(account.url);
            await AccountMethods.checkIfIdIsAlreadyInDB(newAccountID);
          } catch (e) {
            addedAccounts--;
            defectedAccounts.push({ account, reason: "Is already in DB" });
            return;
          }
          return AccountMethods.createAccount(account);
        } else {
          addedAccounts--;
          defectedAccounts.push({account, reason:"No url provided"})
        }
      })
    );
    return {
      validAccounts: allAccounts,
      numberOfAddedAccounts: addedAccounts,
      numberOfGivenAccounts: accounts.length,
      defectedAccounts: defectedAccounts,
    };
  },
  removeUrlRepetitionsFromArray: (arr) => {
    const urlBlackList = [];
    const repeatedAccounts = [];
    const uniqueAccounts = arr.map((account) => {
      if (account) {
        if (!urlBlackList.includes(account.url)) {
          urlBlackList.push(account.url);
          return account;
        } else {
          repeatedAccounts.push(account);
        }
      }
    });
    return {uniqueValidAccounts: uniqueAccounts, repeatedAccounts}
  },
};

// ---------------------------Users--------------------------------------
const UserMethods = {
  findUserByEmail: async (email) =>{
    const userQuerySnapshot = await USER_REF.where("email", "==", email).get()
    if(userQuerySnapshot.size !== 1)
      throw new Error("Cant find user by given credentials")
    let userDoc;
    userQuerySnapshot.forEach(doc => userDoc = doc)  
    return userDoc
  },
  bcryptPassword: async (password) => await bcrypt.hash(password, 8),
  generateAuthToken: (data) =>
    jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "2h" }),

  checkIfUserIsInDB: async (email) => {
    const user = await UserMethods.findUserByEmail(email.trim());
    if (user._size > 0) {
      throw "An user with this email is already registered. ";
    }
  },
  findUserById: async (id) => {
    const user = await USER_REF.doc(id).get();
    if (!user.exists) {
      throw "Cant find user";
    }
    return user;
  },

  findUserByEmailAndPassword: async (email, password) => {
    const userDoc = await UserMethods.findUserByEmail(email.trim())
    if (!userDoc) throw new Error("Cant find an user with given credentials");
    if (await !bcrypt.compare(password, userDoc.data().password))
      throw new Error("Cant find an user with given credentials");
    return {data: userDoc.data(), id: userDoc.id};
  },

  createUser: async (body) => {
    const email = body.email;
    const password = await UserMethods.bcryptPassword(body.password);
    return { email, password };
  },

  getDataAndIdOutSnapshot: (snap) => {
    var data = [];
    var id = [];
    snap.forEach((doc) => {
      if (doc.exists) {
        data.push(doc.data());
        id.push(doc.id);
      }
    });
    if (data.length === 1) {
      data = data[0];
      id = id[0];
    }
    return { data, id };
  },
};

module.exports = { UserMethods, AccountMethods };
