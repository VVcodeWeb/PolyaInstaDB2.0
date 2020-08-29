import React, {useState} from "react";
import dayjs from "dayjs"
import PropTypes from "prop-types"
//Material UI
import Divider from '@material-ui/core/Divider';
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import Checkbox from '@material-ui/core/Checkbox';
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots} from "@fortawesome/free-solid-svg-icons"
import { DialogContent } from "@material-ui/core";

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

function Row(props) {
  const classes = useStyles()
  const row = props.row
  const StyledTableCell = withStyles((theme) => ({

  }))(TableCell);
  const PurpuleCheckBox = withStyles({
    root: {
      color: "#7e57c2",
      '&$checked': {
        color: "#512da8",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const [open, setOpen] = useState(false);
  const [openDescription, setOpenDescription] = useState(false)
  const handleClickOpen = () => setOpenDescription(true)
  const handleClickClose = () => setOpenDescription(false)

  return (
      <React.Fragment>
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
                      {row.description
                      ?(<TableCell>
                          <div style={comment_icon_active}>
                            <FontAwesomeIcon icon={faCommentDots} onClick={handleClickOpen}/>
                          </div>
                        </TableCell>
                      ):(<TableCell>
                          <div style={comment_icon_disabled} >
                            <FontAwesomeIcon icon={faCommentDots}/>
                          </div>
                        </TableCell>
                      )}
                      <TableCell scope="row">
                        {row.createdAt? dayjs(row.createdAt).format('DD.MM.YY HH:mm'):" Unknown "}
                      </TableCell>
                      <TableCell scope="row">
                        {row.changedAt? dayjs(row.changedAt).format('DD.MM.YY HH:mm') : " - "}
                      </TableCell>
                      <TableCell>{row.percentTAgeo || " - "}</TableCell>
                      <TableCell>{row.percentTAsex || " - "}</TableCell>
                      <TableCell align="right">{row.percentTAage || " - "}</TableCell>
                      <TableCell align="right">{row.blackList? "Yes" :  " No "}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <Dialog open={openDescription} onClose={handleClickClose} aria-labelledby="form-dialog-title" className="p-5" fullWidth={true}>
          <DialogTitle>Comment</DialogTitle>
          <Divider component="hr" variant="middle" />
          <DialogContent>
            <Typography variant="body1">
              {row.description}
            </Typography>
          </DialogContent>
    
        </Dialog>
      </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  ariaCheck: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired
}

const comment_icon_active = {
  color: "#512da8",
  fontSize: "15px",
  cursor: "pointer"
}
const comment_icon_disabled = {
  color: "#E1E1E1",
  fontSize: "15px"
}

export default Row;
