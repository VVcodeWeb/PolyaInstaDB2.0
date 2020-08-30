import React, { memo, Fragment } from 'react';
import "../Uploader/UploadFileWindow.scss";
import clsx from 'clsx';
import PropTypes from "prop-types"
//Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import SearchInput from "../Table/SearchInput"

const WhiteTextTypography = withStyles({
    root: {
      color: "#ffffff"
    }
  })(Typography);

const CustomAppBar = (props) => {
    const {classes, handleDrawerOpen, open, setParentField} = props
    return(
    <Fragment>
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
                <SearchInput onChange={setParentField}></SearchInput>
            </div>
            </Toolbar>
        </AppBar>
    </Fragment>
    )
}
CustomAppBar.propTypes = {
    handleDrawerOpen: PropTypes.func.isRequired,
    classes: PropTypes.any.isRequired,
    open: PropTypes.bool.isRequired,
    setParentField: PropTypes.func.isRequired
}
export default memo(CustomAppBar)
