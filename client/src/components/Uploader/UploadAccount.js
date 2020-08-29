//libs, scss
import React, { useState } from "react";
import "./Uploaders.scss";
import "./UploadAccount.scss";
import PropTypes from "prop-types"
//Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemIcon from "@material-ui/core/ListItemIcon"
//Components
import UploadForm from "./UploadForm"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root:{
    padding: 0,
    margin: 8
  }
})
function UploadAccount(props) {
  const classes = useStyles()
  //const [failedInput, setFailedInput] = useState(false);
  const dataToSendSkeleton = {
    url: "",
    theme: "",
    product: "",
    reach: "",
    subscribersIncome: "",
    cost: "",
    percentTAgeo: "",
    percentTAsex: "",
    percentTAage: "",
    description: "",
    blackList: false,
  }
  const [open, setOpen] = useState(false) 
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  return (
   <>
    <ListItemIcon onClick={handleClickOpen} className={props.svg}><FontAwesomeIcon icon={faUserPlus} /></ListItemIcon>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="p-5" fullWidth={true}>
      <div className="dialog_wrapper p-3">
        <DialogTitle classes={{root: classes.root}}id="form-dialog-title">Upload account</DialogTitle>
          <UploadForm dataToSendSkeleton={dataToSendSkeleton}/>
      </div>
    </Dialog>
    
   </>
  );
}
UploadAccount.propTypes = {
  svg: PropTypes.string
}
export default UploadAccount;
