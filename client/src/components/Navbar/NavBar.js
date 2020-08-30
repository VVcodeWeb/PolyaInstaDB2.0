//Libs,scss
import React, { useState, memo } from 'react';
import "../Uploader/UploadFileWindow.scss";
import PropTypes from "prop-types"
//Material UI
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from "./Appbar"
import Drawer from "./Drawer"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#b39ddb",

  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icons: {
    width: "100%",
    icon:{
        fontSize: "25px",
        marginTop: "40px",
        color: "#1ad53a",
    }
  },
  svg:{
    fontSize: "30px",
    color: "#7e57c2"
  },
  search: {
    float: "right",
    flex: 2
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const {setParentField} = props
  
  return (
    <div className={classes.root}>
      <AppBar classes={classes} handleDrawerOpen = {handleDrawerOpen} open={open} setParentField={setParentField}/>
      <Drawer classes={classes} handleDrawerClose = {handleDrawerClose} open={open} theme={theme}/>
    </div>
  )
}

NavBar.propTypes = {
  setParentField: PropTypes.func.isRequired
}

export default memo(NavBar)