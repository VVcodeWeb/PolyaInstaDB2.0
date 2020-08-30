//Libs, scss
import React, { useState, Fragment, useCallback } from "react";
import axios from "axios"
import PropTypes from 'prop-types';
//Material UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress  from "@material-ui/core/CircularProgress"

//components, utils
import Row from "./Row";
import Toolbar from "./Toolbar"
import DeleteDialog from "./DeleteDialog"
//import Loader from "../Loader";
import EnhancedTableHead from "./EnhancedTableHead";
import { isObjectEmpty } from "../../utils/utils";
import {filterRowsByValue, stableSort, getComparator} from "../../utils/sorting"



const useStyles = makeStyles({
  table: {
    minWidth: 700,
    minHeight: 200,  
    position: "relative"
  },
});
function DataTable(props) {
  
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] =  useState("url");
  const [selected, setSelected] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false)
  
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleRequestSort = useCallback(
    (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }, [order, orderBy]);

  const handleClickCallback = useCallback(
      (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
          );
        } 
        setSelected(newSelected);

  }, [selected]);

  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        const newSelecteds = props.rows.map((n) => n.url);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
  }, [props.rows]);

  const handleDeleteIconClick = () => setDeleteDialog(true)

  const handleClose = useCallback(
    () => {setDeleteDialog(false)
  }, [])

  const handleAcceptDeleteButton = useCallback( async () => {
    const ac = new AbortController()
    try{
      const params = new URLSearchParams()
      selected.forEach((url) => {
        params.append("accounts", url)
      })
      await axios.delete("/api/account", { params: params}, {signal: ac.signal})
      setDeleteDialog(false)
    } catch(e){
      alert(e.response.data.error)
    } 
    return () => ac.abort
  }, [selected])

  const loaderStyle = {
    color: "#1ad53a",  
    position: "absolute",
    top: "55%",
    left: "50%"
  }

  return (
    <Fragment>
      <Toolbar numSelected={selected.length} handleDeleteIconClick={handleDeleteIconClick}/>
      {isObjectEmpty(props.rows) ? (
              <Fragment>
                <CircularProgress style={loaderStyle} size="60px"/>
              </Fragment>
       ) : (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            stickyHeader
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead 
              onSelectAllClick={handleSelectAllClick}                      
              onRequestSort={handleRequestSort}                            
              order={order} orderBy={orderBy} numSelected={selected.length}                            
              rowCount={props.rows.length}                        
              classes={classes}/>
            <TableBody key={props.rows[0].url}>         
                  {stableSort( props.filterByValue? filterRowsByValue(props.rows, props.filterByValue) : props.rows, getComparator(order, orderBy))
                  .map((row, index) => {
                      const isItemSelected = isSelected(row.url);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return <Row key={row.url} handleClick={handleClickCallback} row={row} ariaCheck={isItemSelected} labelId={labelId}/>;
                  })            
              }
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <DeleteDialog deleteDialog={deleteDialog} handleClose={handleClose} handleAcceptDeleteButton={handleAcceptDeleteButton} length={selected.length}/>
      
    </Fragment>
  );
  
}
DataTable.propTypes = {
  rows: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ])
}
export default DataTable;
