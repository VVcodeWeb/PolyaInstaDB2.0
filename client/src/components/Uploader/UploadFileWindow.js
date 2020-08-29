import React, { useState, useEffect } from "react";
import "./UploadFileWindow.scss";
import { faQuestionCircle, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Uploaders.scss"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress  from "@material-ui/core/CircularProgress"
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';

//Components
import LogList from "../Listing"
import { Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "#1ad53a"
  },
  root: {
    width: '100%',
    maxWidth: 560,
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 700,
    minHeight: 400,
  },
  margin: {
    marginTop: 20,
    marginBottom: 15
  }
}));

function UploadImageWindow(props) {
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState(null);
  //const [receivedUploadResponse, setReceivedUploadResponse] = useState(false)
  const [sentRequestStatus, setSentRequestStatus] = useState(false) 
  const [open, setOpen] = useState(false)
  const [serverResponse, setServerResponse] = useState("");
  const [noteDropStatus, setNoteDropStatus] = useState(false);

  const onFileChange = (event) => setSelectedFile(event.target.files[0]);

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const onNoteClick = () => setNoteDropStatus((prev) => !prev);

  const loaderColor = {
    color: "#1ad53a",  
  }
  
  useEffect(() => {
    const ac = new AbortController()
    const uploadFile = () => {
      if (selectedFile === null) return;
      setSentRequestStatus(true)
      const formData = new FormData();
      formData.append("data", selectedFile, selectedFile.name);
      axios
        .post("api/upload", formData, {signal: ac.signal})
        .then((response) => {
          console.log(response.data.result.defectedAccounts)
          setServerResponse(response.data.result);
          setSentRequestStatus(false)
          setSelectedFile(null)
        })
        .catch((err) => {
          console.log(err.response.data.error)
          if(err.response)
            setServerResponse({error: err.response.data.error});
          setSentRequestStatus(false)
          setSelectedFile(null)
        });
    };
    uploadFile()
    return () => {
      ac.abort()
    }
  }, [selectedFile])
  
  return (
    <> 
      <ListItemIcon onClick={handleClickOpen} className={props.svg}><FontAwesomeIcon  icon={faFileUpload} /></ListItemIcon>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="p-5" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Upload file</DialogTitle>
        <DialogContent>
          Please use only .csv files
        </DialogContent>
        <div className="upload_image_window__text_note  mx-2 my-4">
          <p>One can only upload csv docs. Follow these column names, please:  </p>
          <FontAwesomeIcon className="question_circle ml-4" icon={faQuestionCircle} onClick={onNoteClick} />
        </div>
        <div className={`notes mx-2 mt-2 ${noteDropStatus ? "open" : ""}`}>
          <div className="note">
            <p>url</p>
            <p>theme</p>
            <p>product</p>
          </div>
          <br/>
          <div className="note">
            <p>reach</p>
            <p>subscribersIncome</p>
            <p>cost</p>
          </div>
          <br/>
          <div className="note">
            <p>percentTAgeo</p>
            <p>percentTAsex</p>
            <p>percentTAage</p>
          </div>
          <br/>
          <div className="note">
            <p>blackList</p>
            <p>description</p>
          </div>
        </div>
        <div className="upload_image_window__upload_file mt-3">
          {sentRequestStatus
          ?(<CircularProgress style={loaderColor}/>
          ):(
            <div className={classes.margin}>
              <input onChange={onFileChange} type="file" accept="csv/*" />
            </div>
          )}
          {serverResponse.hasOwnProperty("error") && (
            <Typography color="error"> 
              {serverResponse.error}
            </Typography>
          )}
          {serverResponse.hasOwnProperty("defectedAccounts") && (
            <>
              <Typography className={classes.margin} variant="body2">Added {serverResponse.numberOfAddedAccounts} from {serverResponse.numberOfGivenAccounts}</Typography>
              <Typography className={classes.margin} variant="body2">Log:</Typography>
              <Divider />
              {<LogList defectedAccounts={serverResponse.defectedAccounts? serverResponse.defectedAccounts: null} /> }
            </>
          )}       
        </div>
      </Dialog>
    </>
  );
  
}

UploadImageWindow.propTypes = {
  svg: PropTypes.string
} 
export default UploadImageWindow;
