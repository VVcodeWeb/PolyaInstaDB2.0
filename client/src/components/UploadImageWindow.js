import React, { useState } from "react";
import "./UploadImageWindow.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Uploaders.scss"

function UploadImageWindow(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  //const [receivedUploadResponse, setReceivedUploadResponse] = useState(false)
  const [serverResponse, setServerResponse] = useState("");
  const [noteDropStatus, setNoteDropStatus] = useState(false);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onNoteClick = () => {
    setNoteDropStatus((prev) => !prev);
  };

  const uploadFile = () => {
    if (selectedFile === null) return;
    const formData = new FormData();
    formData.append("data", selectedFile, selectedFile.name);
    axios
      .post("api/upload", formData)
      .then((response) => {
        setServerResponse(response.data.result);
        console.log(response.data.result);
      })
      .catch((err) => {
        console.log(err);
        setServerResponse(err);
      });
  };
  return (
    <div
      className={`p-5 upload_image_window overflow_y_scroll ${
        props.open ? "open_window" : "close_window"
      }`}
    >
      <div className="close_icon_wrapper">
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => props.changeUploadWindowStatus(props.windowName)}
        />
      </div>
      <div className="upload_image_window__text ">
        <h2>Uploading of documents to the database</h2>
        <div className="upload_image_window__text_note  my-4">
            <p>One can only upload csv docs. Follow these column names, please:  </p>
            <FontAwesomeIcon className="question_circle ml-4" icon={faQuestionCircle} onClick={onNoteClick} />
        </div>
        <div className={`notes mt-2 ${noteDropStatus ? "open" : ""}`}>
            <p>url</p>
            <p>theme</p>
            <p>product</p>
            <p>reach</p>
            <p>subscribersIncome</p>
            <p>cost</p>
            <p>percentTAgeo</p>
            <p>percentTAsex</p>
            <p>percentTAage</p>
            <p>blackList</p>
            <p>description</p>
        </div>
        <p>Only files below 5MB</p>
      </div>
      <div className="upload_image_window__upload_file mt-3">
        <input type="file" onChange={onFileChange} />
        <button type="submit" className="submit_button" onClick={uploadFile}>
          Submit
        </button>
      </div>
      
      {serverResponse.length === 0 ? (
        <div></div>
      ) : (
        <div className="server_response">
          <div className="server_response__header">
            <h2>
              Added to db: {serverResponse.numberOfAddedAccounts} of uploaded:{" "}
              {serverResponse.numberOfGivenAccounts}
            </h2>
          </div>
          <div className="server_response__body">
            {serverResponse
              ? serverResponse.defectedAccounts.map((defect, index) => (
                  <div className="server_response__body__errors">
                    <p key={index}>{defect.account.url}:</p>{" "}
                    <p>{defect.reason}</p>
                  </div>
                ))
              : ""}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadImageWindow;
