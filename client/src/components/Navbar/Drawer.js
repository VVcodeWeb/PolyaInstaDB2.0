import React, { memo } from 'react';
import { Link } from "react-router-dom";
import "../Uploader/UploadFileWindow.scss";
import clsx from 'clsx';
import PropTypes from "prop-types"
//Material UI
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import UploadFileWindow from "../Uploader/UploadFileWindow"
import UploadAccount from "../Uploader/UploadAccount"
import {
    faDatabase,
    faCaretSquareLeft,
    faUserAlt,
  } from "@fortawesome/free-solid-svg-icons";

  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CustomDrawer = (props) => {
    const {open, classes, theme, handleDrawerClose} = props
    return(
        <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button>
              <Link to="/" ><ListItemIcon className={classes.svg}><FontAwesomeIcon icon={faCaretSquareLeft}/></ListItemIcon></Link>
              <ListItemText primary={"Back to login page"}/>
            </ListItem>
            <ListItem style={{marginTop: "20px"}} button>
              <ListItemIcon className={classes.svg}><FontAwesomeIcon icon={faDatabase}/></ListItemIcon>
              <ListItemText primary={"Database"}  />
            </ListItem>
            <ListItem style={{marginTop: "20px"}} button>
              <ListItemIcon className={classes.svg}><FontAwesomeIcon icon={faUserAlt}/></ListItemIcon>
              <ListItemText primary={"User profile"}  />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem style={{marginTop: "20px"}} button>
              <UploadFileWindow svg={classes.svg}/>
              <ListItemText primary={"Upload a file"}  />
            </ListItem>
            <ListItem style={{marginTop: "20px"}} button>
              <UploadAccount svg={classes.svg}></UploadAccount>
              <ListItemText primary={"Upload an account"}  />
            </ListItem>
        </List>
      </Drawer>
    )
}
CustomDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    classes: PropTypes.any.isRequired,
    theme: PropTypes.any
}


export default memo(CustomDrawer)
