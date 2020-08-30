import React, { useState, Fragment, memo } from "react";
import dayjs from "dayjs"
import PropTypes from "prop-types"


import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { DialogContent } from "@material-ui/core";

const comment_icon_active = {
    color: "#512da8",
    fontSize: "15px",
    cursor: "pointer"
  }
  const comment_icon_disabled = {
    color: "#E1E1E1",
    fontSize: "15px"
  }
const RowBody = (props) => {
    const {row , open} = props
    const [openDescription, setOpenDescription] = useState(false)
    const handleClickOpen = () => setOpenDescription(true)
    const handleClickClose = () => setOpenDescription(false)
  return (
    <Fragment>
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
                    {row.description ? (
                      <TableCell>
                        <div style={comment_icon_active}>
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            onClick={handleClickOpen}
                          />
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <div style={comment_icon_disabled}>
                          <FontAwesomeIcon icon={faCommentDots} />
                        </div>
                      </TableCell>
                    )}
                    <TableCell scope="row">
                      {row.createdAt
                        ? dayjs(row.createdAt).format("DD.MM.YY HH:mm")
                        : " Unknown "}
                    </TableCell>
                    <TableCell scope="row">
                      {row.changedAt
                        ? dayjs(row.changedAt).format("DD.MM.YY HH:mm")
                        : " - "}
                    </TableCell>
                    <TableCell>{row.percentTAgeo || " - "}</TableCell>
                    <TableCell>{row.percentTAsex || " - "}</TableCell>
                    <TableCell align="right">
                      {row.percentTAage || " - "}
                    </TableCell>
                    <TableCell align="right">
                      {row.blackList ? "Yes" : " No "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={openDescription}
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
        className="p-5"
        fullWidth={true}
      >
        <DialogTitle>Comment</DialogTitle>
        <Divider component="hr" variant="middle" />
        <DialogContent>
          <Typography variant="body1">{row.description}</Typography>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

RowBody.propsTypes = {
    row: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
}

export default memo(RowBody)