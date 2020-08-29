//Libs, scss
import React, { useState, Fragment } from "react";
import axios from "axios"
import PropTypes from 'prop-types';
//Material UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress  from "@material-ui/core/CircularProgress"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

//components, utils
import Row from "./Row";
import Toolbar from "./Toolbar"
//import Loader from "../Loader";
import EnhancedTableHead from "./EnhancedTableHead";
import { isObjectEmpty } from "../../utils/utils";
import {filterRowsByValue, stableSort, getComparator} from "../../utils/sorting"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const headCells = [
    { id: "url", numeric: false, disablePadding: false, label: "URL" },
    { id: "theme", numeric: false, disablePadding: false, label: "Тема" },
    { id: "product", numeric: false, disablePadding: false, label: "Продукт" },
    { id: "reach", numeric: true, disablePadding: false, label: "Охват" },
    { id: "subscribersIncome", numeric: true, disablePadding: false, label: "Приход подписчиков",},
    { id: "cost", numeric: true, disablePadding: false, label: "Стоимость" },
    { id: "TA", numeric: true, disablePadding: false, label: "ЦА(%)" },
    { id: "costReachTA", numeric: true, disablePadding: false, label: "Стоимость охвата ЦА"},
    { id: "costReach", numeric: true, disablePadding: false, label: "Стоимость охвата"},
    { id: "subscribersCost", numeric: true, disablePadding: false, label: "Стоимость подписчика"},
  ];
  

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleClick = (event, name) => {
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
  };

  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.url);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDeleteIconClick = () => setDeleteDialog(true)
  const handleClose = () => setDeleteDialog(false)
  const handleAcceptDeleteButton = async () => {
    const ac = new AbortController()
    console.log(selected)
    try{
      const params = new URLSearchParams()
      selected.forEach((url) => {
        params.append("accounts", url)
      })
      const response = await axios.delete("/api/account", { params: params}, {signal: ac.signal})
      if(response.data.hasOwnProperty("result")){
        console.log(response.data.result)
      }
      setDeleteDialog(false)
    } catch(e){
      console.log(e.response.data.error)
    } 
    return () => ac.abort
  }

  const loaderStyle = {
    color: "#1ad53a",  
    position: "absolute",
    top: "55%",
    left: "50%"
  }

  return (
    <React.Fragment>
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
              headCells={headCells} onSelectAllClick={handleSelectAllClick}                      
              onRequestSort={handleRequestSort}                            
              order={order} orderBy={orderBy} numSelected={selected.length}                            
              rowCount={props.rows.length}                        
              classes={classes}/>
            <TableBody key={props.rows[0].url}>         
                  {stableSort( props.filterByValue? filterRowsByValue(props.rows, props.filterByValue) : props.rows, getComparator(order, orderBy))
                  .map((row, index) => {
                      const isItemSelected = isSelected(row.url);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return <Row key={row.url} handleClick={handleClick} row={row} ariaCheck={isItemSelected} labelId={labelId}/>;
                  })            
              }
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog
        open={deleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Do you want to delete accounts from the database?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {selected.length} accounts will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAcceptDeleteButton} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  
}
DataTable.propTypes = {
  rows: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ])
}
export default DataTable;
