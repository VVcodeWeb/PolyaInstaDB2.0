import React, { useState } from "react";
import "./Uploaders.scss";
import "./UploadAccount.scss";

import Checkbox from "@material-ui/core/Checkbox";
import InputForm from "../components/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ButtonLoader from "./ButtonLoader";


function UploadAccount(props) {
  //const [failedInput, setFailedInput] = useState(false);
  const [sentRequestStatus,setSentRequestStatus] = useState(false)
  const [serverResponse, setServerResponse] = useState("")
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
  const [dataToSend, setDataToSend] = useState(dataToSendSkeleton)

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "blackList") {
      setDataToSend({ ...dataToSend, [name]: e.target.checked });
    } else setDataToSend({ ...dataToSend, [name]: value });
  };

  const submitInputHandler = async() => {
    try {
      if(!dataToSend.url) return;
      setSentRequestStatus(true)
      const params = new URLSearchParams()
      params.append("url", dataToSend.url)
      params.append("theme", dataToSend.theme)
      params.append("product", dataToSend.product)
      params.append("reach", dataToSend.reach)
      params.append("subscribersIncome", dataToSend.subscribersIncome)
      params.append("cost", dataToSend.cost)
      params.append("percentTAage", dataToSend.percentTAage)
      params.append("percentTAgeo", dataToSend.percentTAgeo)
      params.append("percentTAsex", dataToSend.percentTAsex)
      params.append("description", dataToSend.description)
      params.append("blackList", dataToSend.blackList)
    
      const response = await axios.post("api/account", params)
      if(response.data.hasOwnProperty("result"))
        setServerResponse({success: response.data.result});
      else
        setServerResponse({...response.data})
      setSentRequestStatus(false)
      setDataToSend(dataToSendSkeleton)
    } catch (err) {
      if(err.response.data.hasOwnProperty("error"))
        setServerResponse({error: err.response.data.error});
      else 
        setServerResponse({error: "Unrecognized error occured"})
      setSentRequestStatus(false)
    }
  };

  return (
    <div
      className={`upload_account_window  overflow_y_scroll p-5 ${
        props.open ? "open_window" : "close_window"
      }`}
    >
      <div className="close_icon_wrapper">
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => props.changeUploadWindowStatus(props.windowName)}
        />
      </div>
      <div className="inputs px-5">
        <InputForm
          placeholder="URL"
          value={dataToSend.url}
          onChange={inputChangeHandler}
          name="url"
        />
        <InputForm
          placeholder="Theme"
          value={dataToSend.theme}
          name="theme"
          onChange={inputChangeHandler}
        />
        <InputForm
          placeholder="Product"
          value={dataToSend.product}
          onChange={inputChangeHandler}
          name="product"
        />
        <InputForm
          placeholder="Reach"
          value={dataToSend.reach}
          onChange={inputChangeHandler}
          name="reach"
        />
        <InputForm
          placeholder="subscribersIncome"
          value={dataToSend.subscribersIncome}
          onChange={inputChangeHandler}
          name="subscribersIncome"
        />
        <InputForm
          placeholder="Cost"
          value={dataToSend.cost}
          onChange={inputChangeHandler}
          name="cost"
        />
        <InputForm
          placeholder="percentTAage"
          value={dataToSend.percentTAage}
          onChange={inputChangeHandler}
          name="percentTAage"
        />
        <InputForm
          placeholder="percentTAgeo"
          value={dataToSend.percentTAgeo}
          onChange={inputChangeHandler}
          name="percentTAgeo"
        />
        <InputForm
          placeholder="percentTAsex"
          value={dataToSend.percentTAsex}
          onChange={inputChangeHandler}
          name="percentTAsex"
        />
        <InputForm
          placeholder="description"
          value={dataToSend.description}
          onChange={inputChangeHandler}
          name="description"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={dataToSend.blackList}
              onChange={inputChangeHandler}
              name="blackList"
              color="secondary"
            />
          }
          label="Blacklist"
        />
        <div className="server_response">
          {serverResponse.success
            ? <p className="success">{serverResponse.success}</p>
            : <p className="error">{serverResponse.error}</p>
          }
        </div>
        {sentRequestStatus
          ? <ButtonLoader />
          : <button type="submit" className={`submit_button ${serverResponse? "move_down_50px": ""}`} value={dataToSend.blackList} onClick={submitInputHandler}> Submit </button>
        }
      </div>
    </div>
  );
}

export default UploadAccount;
