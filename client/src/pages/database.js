//libs,scss
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./database.scss";

//components, utils
import DataTable from "../components/Table/DataTable";
import NavBar from "../components/Navbar/NavBar"
//icons


function DatabasePage() {
  
  const [allAccounts, setAllAccounts] = useState([]);
  const [filterByValue, setFilterByValue] = useState("")

  const handleSearchFieldChange = useCallback(
    (value) => {
      setFilterByValue(value)
    },
    []
  ) 

  useEffect(() => {
    const ac = new AbortController()
    const fetchAllAccounts = () => {
      axios
        .get("/api/accounts", {signal: ac.signal})
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
    return () => {
      ac.abort()
    }
  }, []);

  return (
    <div className="db">
      <div className="db__main_content">
        <NavBar setParentField={handleSearchFieldChange}/>  
        <div className="data_table">
           <DataTable rows={allAccounts} filterByValue={filterByValue}/>
        </div>
      </div>
    </div>
  );
}

export default DatabasePage;
