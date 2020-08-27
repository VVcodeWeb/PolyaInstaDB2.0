//libs,scss
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Database.scss";
import "@material-ui/core";

//components, utils, scss
import { getAuthenticationStatus } from "../utils/utils";
import DataTable from "../components/Table/DataTable";
import SearchInput from "../components/Table/SearchInput"

//icons


function DatabasePage() {
  const DataTableMemo = React.memo(DataTable)
  const [isLoggedIn, setLoggedIn] = useState("");
  const [allAccounts, setAllAccounts] = useState([]);
  const [filterByValue, setFilterByValue] = useState("")

  const handleSearchFieldChange = (value) => setFilterByValue(value)
  
  useEffect(() => {
    //const abortController = new AbortController()
    const fetchAllAccounts = () => {
      axios
        .get("/api/accounts")
        .then((response) => {
          if(response.data.result)
            setAllAccounts(response.data.result);
        })
        .catch((err) => {
          console.log(err)
          if(err.response.data)
            console.log(err.response.data);
          
        });
    };
    fetchAllAccounts();
    getAuthenticationStatus(setLoggedIn);
    return () => {
      //abortController.abort()
    }
  }, []);

  return (
    <div className="db">
      <div className="db__main_content">
        <div className="db__main_content__header p-4">
          
          <div className="title">
            <h2>{isLoggedIn ? "Welcome Polya!" : "Welcome stranger!"}</h2>
          </div>
          <div className="search">
            <SearchInput type="db" onChange={handleSearchFieldChange}></SearchInput>
          </div>
        </div>
        <div className="data_table m-3 mt-5">
           <DataTableMemo rows={allAccounts} filterByValue={filterByValue}/>
        </div>
      </div>
    </div>
  );
}

export default DatabasePage;
