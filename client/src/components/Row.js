import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";


import "./Row.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots} from "@fortawesome/free-solid-svg-icons"


function Row(props) {
  const row = props.row
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });
  const StyledTableCell = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableCell);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <StyledTableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row"><a className="link" target="blank" href={row.url}>{row.url.substring(26) || "Missing"}</a></StyledTableCell>
          <StyledTableCell align="right">{row.theme || " - "}</StyledTableCell>
          <StyledTableCell align="right">{row.product || " - "}</StyledTableCell>
          <StyledTableCell align="right">{row.reach || " - "}</StyledTableCell>
          <StyledTableCell align="right">{row.subscribersIncome || " - "}</StyledTableCell>
          <StyledTableCell align="right">{row.cost || " - "}</StyledTableCell>
          <StyledTableCell align="right">{row.TA || " - "}</StyledTableCell>
          <StyledTableCell align="right">{row.costReachTA || " - "}</StyledTableCell>
          <StyledTableCell align="right">{row.costReach || " - "}</StyledTableCell>
          <StyledTableCell align="right">{row.subscriberCost || " - "}</StyledTableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Info
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Added</TableCell>
                      <TableCell>Changed</TableCell>
                      <TableCell>percentTAgeo</TableCell>
                      <TableCell>percentTAsex</TableCell>
                      <TableCell align="right">percentTAage</TableCell>
                      <TableCell align="right">blackList</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={new Date() || " - "}>
                      <TableCell><div style={comment_icon}><FontAwesomeIcon icon={faCommentDots}/></div></TableCell>
                      <TableCell component="th" scope="row">
                          {new Date().toISOString() || " - "}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {new Date().toISOString() || " - "}
                      </TableCell>
                      <TableCell>{row.percentTAgeo || " - "}</TableCell>
                      <TableCell>{row.percentTAsex || " - "}</TableCell>
                      <TableCell align="right">{row.percentTAage || " - "}</TableCell>
                      <TableCell align="right">{row.fat || " - "}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
  );
}

const comment_icon = {
  color: "#333333",
  fontSize: "15px"
}


export default Row;
