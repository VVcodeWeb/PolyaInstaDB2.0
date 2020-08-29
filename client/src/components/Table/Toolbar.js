import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
          theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: "#b71c1c",
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
           
        },
    title: {
      flex: '1 1 100%',
    },
    white_button:{
      color: "#fff"
    }
  }));
  const WhiteTextTypography = withStyles({
    root: {
      color: "#ffffff"
    }
  })(Typography);

  const CustomToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, handleDeleteIconClick } = props;
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 && (
          <WhiteTextTypography className={classes.title} variant="subtitle1" component="div">
            {numSelected} selected
          </WhiteTextTypography>
        )}

        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDeleteIconClick}>
              <DeleteIcon className={classes.white_button} />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  CustomToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    handleDeleteIconClick: PropTypes.func.isRequired
  }
  export default CustomToolbar
  