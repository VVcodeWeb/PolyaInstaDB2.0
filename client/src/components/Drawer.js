//Libs,scss
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Uploader/UploadFileWindow.scss";
import clsx from 'clsx';
import PropTypes from "prop-types"
//Material UI
import SearchInput from "../components/Table/SearchInput"
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import UploadFileWindow from "./Uploader/UploadFileWindow"


import UploadAccount from "./Uploader/UploadAccount"
//icons
import {
    faDatabase,
    faCaretSquareLeft,
    faUserAlt,
  } from "@fortawesome/free-solid-svg-icons";

  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const {setParentField: setParentSearchValue} = props
  const WhiteTextTypography = withStyles({
    root: {
      color: "#ffffff"
    }
  })(Typography);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >   
        <Toolbar className={classes.topbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <WhiteTextTypography variant="h6" noWrap>
              PolyaInstagramDatabase
            </WhiteTextTypography>
          <div className={`${classes.search} search`}>
            <SearchInput type="db" onChange={setParentSearchValue}></SearchInput>
          </div>
        </Toolbar>

      </AppBar>
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
    </div>
  )
}

MiniDrawer.propTypes = {
  setParentField: PropTypes.func.isRequired
}
