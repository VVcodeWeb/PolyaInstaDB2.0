//libs
import React from 'react'


//components
import Table from "@material-ui/core/Table"
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Row from "./Row"
import Loader from './Loader';


//utils
import {isObjectEmpty} from "../utils/utils"


function DataTable( props ) {
    const useStyles = makeStyles({
        table: {
          minWidth: 1000,
        },
      });
    const classes = useStyles();
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: "#333333",
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
      }))(TableCell);
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} stickyHeader size="medium" aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell>URL</StyledTableCell>
                            <StyledTableCell align="right">theme</StyledTableCell>
                            <StyledTableCell align="right">product&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">reach&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">Приход подписчиков&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">Стоимость</StyledTableCell>
                            <StyledTableCell align="right">ЦА&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Стоимость охвата ЦА&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Стоимость охвата&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Стоимость подписчика&nbsp;(g)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody key={props.rows}>
                            {isObjectEmpty(props.rows)
                            ? <React.Fragment><Loader /></React.Fragment>
                            :  props.rows.map((row) => (
                                    <Row key={row.url} row={row} />
                                ))             
                            }       
                    </TableBody>                            
                </Table>
            </TableContainer>
        </div>
    )
}

export default DataTable
