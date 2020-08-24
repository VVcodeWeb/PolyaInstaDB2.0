//libs,scss
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Database.scss";
import "@material-ui/core";

//components, utils, scss
import { getAuthenticationStatus } from "../utils/utils";
import Input from "../components/Input";
import DataTable from "../components/DataTable";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedo,
  faTimes,
  faSearch,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

function DatabasePage() {
  const [isLoggedIn, setLoggedIn] = useState("");
  const [allAccounts, setAllAccounts] = useState([]);
  const fetchAllAccounts = () => {
    axios
      .get("/api/accounts")
      .then((response) => {
        setAllAccounts(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchAllAccounts();
    getAuthenticationStatus(setLoggedIn);
  }, []);
  return (
    <div className="db">
      <div className="db__main_content">
        <div className="db__main_content__header p-4">
          <div className="title">
            <h1>{isLoggedIn ? "Welcome Polya!" : "Welcome stranger!"}</h1>
          </div>
          <div className="search">
            <Input type="db" icon={faSearch}></Input>
            <div className="expand_icon_wrapper">
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
          </div>
          <div className="actions">
            <div className="actions_icon_wrapper">
              <FontAwesomeIcon icon={faRedo} />
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        </div>
        <div className="data_table m-3 mt-5">
          <DataTable key={allAccounts} rows={allAccounts} />
        </div>
      </div>
    </div>
  );
}

export default DatabasePage;
