//libs
import React from "react";

//Material UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

//components
import Row from "./Row";
import Loader from "../Loader";
import EnhancedTableHead from "./EnhancedTableHead";
//utils
import { isObjectEmpty } from "../../utils/utils";
import {filterRowsByValue, stableSort, getComparator} from "../../utils/sorting"

function DataTable(props) {
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("url");
  const [selected, setSelected] = React.useState([]);
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
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          stickyHeader
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead headCells={headCells} onSelectAllClick={handleSelectAllClick} 
                            onRequestSort={handleRequestSort} 
                            order={order} orderBy={orderBy} numSelected={selected.length} 
                            rowCount={props.rows.length}
                            classes={classes}/>
          <TableBody key={props.rows}>
            {isObjectEmpty(props.rows) ? (
              <React.Fragment>
                <Loader />
              </React.Fragment>
            ) : (
                stableSort( props.filterByValue? filterRowsByValue(props.rows, props.filterByValue) : props.rows, getComparator(order, orderBy))
                .map((row, index) => {
                    const isItemSelected = isSelected(row.url);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return <Row key={row.url} handleClick={handleClick} row={row} ariaCheck={isItemSelected} labelId={labelId}/>;
                })
            )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default DataTable;

/* props.searchValue? filterRowsByValue(props.rows, props.searchValue) || props.rows:  */
  /* <StyledTableCell />
                            <StyledTableCell align="left"><TableSortLabel classes={tableSortLabelClass}/> URL</StyledTableCell>
                            <StyledTableCell align="right"><TableSortLabel />Тема&nbsp;</StyledTableCell>
                            <StyledTableCell align="right"><TableSortLabel />Продукт&nbsp;</StyledTableCell>
                            <StyledTableCell align="right"><TableSortLabel />Охват&nbsp;</StyledTableCell>
                            <StyledTableCell align="right"><TableSortLabel />Приход подписчиков&nbsp;</StyledTableCell>
                            <StyledTableCell align="right"><TableSortLabel />Стоимость</StyledTableCell>
                            <StyledTableCell align="right"><TableSortLabel />ЦА&nbsp;(%)</StyledTableCell>
                            <StyledTableCell align="right"><TableSortLabel />Стоимость охвата ЦА&nbsp;(%)</StyledTableCell>
                            <StyledTableCell align="right"><TableSortLabel />Стоимость охвата&nbsp;(%)</StyledTableCell>
                            <StyledTableCell align="right"><TableSortLabel />Стоимость подписчика&nbsp;(%)</StyledTableCell> */

