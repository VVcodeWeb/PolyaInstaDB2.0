import React, {useState, Fragment, memo} from "react";
import PropTypes from "prop-types"
//Material UI
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Checkbox from '@material-ui/core/Checkbox';
import RowBody from "./RowBody"

const useStyles = makeStyles({
  root:{
    background: "#A52A2A",
  },
  a:{
    color: "#fff",
    "&:hover": {
      color: "#fff"
    }
  }
})
const PurpuleCheckBox = withStyles({
  root: {
    color: "#7e57c2",
    '&$checked': {
      color: "#512da8",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const StyledTableCell = withStyles((theme) => ({

}))(TableCell);

function Row(props) {
  const classes = useStyles()
  const row = props.row
  const [open, setOpen] = useState(false);
  return (
      <Fragment>
        <TableRow
          role="checkbox"
          aria-checked={row.ariaCheck}
          tabIndex={-1}
          key={row.url}
          selected={row.ariaCheck}
        >
          <StyledTableCell padding="checkbox">
            <PurpuleCheckBox
              checked={props.ariaCheck}
              onClick={(event) => props.handleClick(event, row.url)}
              inputProps={{ 'aria-labelledby': props.labelId }}
            />
          </StyledTableCell>
          <StyledTableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell className={row.blackList && classes.root} scope="row" id={props.labelId}>
              <a className={row.blackList && classes.a} target="blank" href={row.url}>{row.url.substring(26) || "Missing"}</a>
          </StyledTableCell>
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
        <RowBody row={row} open={open}/> 
      </Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  ariaCheck: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired
}





export default memo(Row);
