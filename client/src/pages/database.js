//libs,scss
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./database.scss";

//components, utils
import DataTable from "../components/Table/DataTable";
import Drawer from "../components/Drawer"
//icons


function DatabasePage() {
  const DataTableMemo = React.memo(DataTable)
  const [allAccounts, setAllAccounts] = useState([]);
  const [filterByValue, setFilterByValue] = useState("")

  const handleSearchFieldChange = (value) => setFilterByValue(value)
  
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
        <Drawer setParentField={handleSearchFieldChange}/>  
        <div className="data_table">
           <DataTableMemo rows={allAccounts} filterByValue={filterByValue}/>
        </div>
      </div>
    </div>
  );
}

export default DatabasePage;
