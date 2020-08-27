import React, {useState} from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faCaretSquareLeft,
  faUserPlus,
  faUserAlt,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";
import UploadImageWindow from "./UploadFileWindow";
import UploadAccount from "../components/UploadAccount"

function SideBar() {
    //const [uploaderOpenStatus, setUploaderOpenStatus] = useState(false)
    const [windowsOpen, setWindowsOpen] = useState({
      uploadAccount: false,
      uploadFile: false
    })
    const changeOpenWindowsStatus = (name) => {
      const tempObject = windowsOpen
      Object.keys(tempObject).forEach((item) => {
        if(item !== name) tempObject[item] = false
        else tempObject[item] = !tempObject[item]
      })
      setWindowsOpen({...tempObject})
    }
  return (
    <div className="side_bar">
      <UploadImageWindow
        windowName = {"uploadFile"}
        changeUploadWindowStatus={changeOpenWindowsStatus}
        open={windowsOpen.uploadFile}
      />
      <UploadAccount 
        windowName = {"uploadAccount"}
        changeUploadWindowStatus={changeOpenWindowsStatus} 
        open={windowsOpen.uploadAccount}
      />
      <div className="side_bar__header py-3"><h1>P</h1></div>
      <div className="side_bar__content_wrapper">
        <Link className="content__buttons mt-3" to="/">
          <FontAwesomeIcon className="icons" icon={faCaretSquareLeft} />
        </Link>
        <Link className="content__buttons mt-3" to="/account?ok">
          <FontAwesomeIcon className="icons" icon={faUserAlt} />
        </Link>
        <div className="content__buttons uploader mt-3" onClick={() => changeOpenWindowsStatus("uploadAccount")}>
          <FontAwesomeIcon className="icons" icon={faUserPlus} />
        </div>

        <div className="content__buttons uploader mt-3" onClick={() => changeOpenWindowsStatus("uploadFile")}>
          <FontAwesomeIcon className="icons" icon={faFileUpload} />
        </div>
        <Link className="content__buttons mt-3" to="/database">
          <FontAwesomeIcon className="icons" icon={faDatabase} />
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
