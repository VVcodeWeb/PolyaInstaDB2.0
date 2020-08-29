import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 560,
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400,
    minHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

function Listing(props) {
  const classes = useStyles();
  const { defectedAccounts } = props

  
  return (
    <List className={classes.root} subheader={<li />}>
        {defectedAccounts.map(({account, reason}, index) => {
          console.log(account)
            return(
              typeof account != 'undefined' && (
                <ListItem key={index}>
                    <ListItemText primary={`${index+1}. ${account.url}`} secondary={`${reason}`} />
                </ListItem>
               )
            )
        })}
    </List>
  );
  
  
}

Listing.propTypes = {
  defectedAccounts: PropTypes.array.isRequired
}

export default Listing