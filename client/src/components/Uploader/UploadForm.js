import React, { useState } from "react";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import "./Uploaders.scss";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types"
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 20,
    width: "25ch",
  },
  fullTextField: {
    marginLeft: 8,
    marginTop: 20,
  },
  margin: {
    marginTop: 20,
    marginLeft: 1
  },
  divWidth: {
    width: "100%",
  },
  displayBlock: {
    display: "block",
  },
}));

function UploadForm(props) {
  const { dataToSendSkeleton } = props;
  const [dataToSend, setDataToSend] = useState(dataToSendSkeleton);
  const classes = useStyles();
  const [sentRequestStatus, setSentRequestStatus] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const submitInputHandler = async () => {
    try {
      if (!dataToSend.url) return;
      setSentRequestStatus(true);
      const params = new URLSearchParams();
      params.append("url", dataToSend.url);
      params.append("theme", dataToSend.theme);
      params.append("product", dataToSend.product);
      params.append("reach", dataToSend.reach);
      params.append("subscribersIncome", dataToSend.subscribersIncome);
      params.append("cost", dataToSend.cost);
      params.append("percentTAage", dataToSend.percentTAage);
      params.append("percentTAgeo", dataToSend.percentTAgeo);
      params.append("percentTAsex", dataToSend.percentTAsex);
      params.append("description", dataToSend.description);
      params.append("blackList", dataToSend.blackList);

      const response = await axios.post("api/account", params);
      if (response.data.hasOwnProperty("result"))
        setServerResponse({ success: response.data.result });
      else setServerResponse({ ...response.data });
      setSentRequestStatus(false);
      setDataToSend(dataToSendSkeleton);
    } catch (err) {
      if (err.response.data.hasOwnProperty("error"))
        setServerResponse({ error: err.response.data.error });
      else if (err.response.data.hasOwnProperty("result")) {
        setServerResponse({ error: err.response.data.result });
      } else setServerResponse({ error: "Unrecognized error occured" });
      setSentRequestStatus(false);
    }
  };
  const PurpuleCheckBox = withStyles({
    root: {
      color: "#E1E1E1",
      '&$checked': {
        color: "#512da8",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "blackList") {
      setDataToSend({ ...dataToSend, [name]: e.target.checked });
    } else setDataToSend({ ...dataToSend, [name]: value });
    console.log(dataToSend.blackList)

  };
  return (
    <div className={classes.root}>
      <div>
        <TextField
          id="Url"
          label="Label"
          placeholder="Url"
          helperText="https://www.instagram.com/{username}"
          fullWidth
          margin="none"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.fullTextField}
          required={true}
          name="url"
          onChange={inputChangeHandler}
        />
        <TextField
          label="Theme"
          id="Theme"
          className={classes.textField}
          helperText="Theme of the account"
          name="theme"
          onChange={inputChangeHandler}
        />
        <TextField
          label="Product"
          id="Product"
          className={classes.textField}
          name="product"
          onChange={inputChangeHandler}
        />
        <TextField
          label="Reach"
          id="Reach"
          className={classes.textField}
          helperText="Viewers pro post"
          margin="none"
          name="reach"
          onChange={inputChangeHandler}
        />
        <TextField
          label="Cost"
          id="Cost"
          className={classes.textField}
          helperText="Current cost of AD"
          margin="none"
          name="cost"
          onChange={inputChangeHandler}
        />
        <TextField
          label="Subscribers income"
          id="Subscribers-income"
          className={classes.textField}
          helperText="Average subscribers income"
          name="subscribersIncome"
          onChange={inputChangeHandler}
        />
      </div>
      <div>
        <TextField
          label="percentTAage"
          id="percentTAage"
          className={classes.textField}
          helperText="Target auditory age"
          margin="normal"
          name="percentTAage"
          onChange={inputChangeHandler}
        />
        <TextField
          label="percentTAsex"
          id="percentTAsex"
          className={classes.textField}
          helperText="Target auditory sex"
          margin="normal"
          name="percentTAsex"
          onChange={inputChangeHandler}
        />
        <TextField
          label="percentTAgeo"
          id="percentTAgeo"
          className={classes.textField}
          helperText="Target auditory geo"
          margin="normal"
          name="percentTAgeo"
          onChange={inputChangeHandler}
        />
      </div>
      <div className={classes.divWidth}>
        <TextField
          id="Description"
          placeholder="Description"
          fullWidth
          margin="none"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          className={classes.fullTextField}
          name="description"
          onChange={inputChangeHandler}
        />
        <FormControlLabel
          className={classes.margin}
          control={
            <PurpuleCheckBox
              checked={dataToSend.blackList}
              onChange={inputChangeHandler}
              name="blackList"
              indeterminate
              color="secondary"
            />}
          label="Blacklist"
        />
      </div>
      {serverResponse.hasOwnProperty("error") ? (
        <Typography color="error" variant="caption">
          {serverResponse.error}
        </Typography>
      ) : (
        serverResponse.hasOwnProperty("success") && (
          <Typography color="textPrimary" variatnt="caption">
            {serverResponse.success}
          </Typography>
        )
      )}
      <div className={`my-4 ml-1 ${classes.displayBlock}`}>
        {sentRequestStatus ? (
          <CircularProgress />
        ) : (
          <Button
            onClick={submitInputHandler}
            variant="contained"
            endIcon={<SaveIcon />}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}

UploadForm.propTypes = {
  dataToSendSkeleton: PropTypes.object

}

export default UploadForm