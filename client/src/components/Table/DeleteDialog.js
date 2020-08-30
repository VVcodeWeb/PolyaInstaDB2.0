import React, {memo} from 'react'
import PropTypes from "prop-types"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from "@material-ui/core/Slide"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DeleteDialog = (props) => {
    const {deleteDialog, handleClose, handleAcceptDeleteButton, length} = props
    return(
        <Dialog
            open={deleteDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Do you want to delete accounts from the database?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {length} accounts will be deleted
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Disagree
            </Button>
            <Button onClick={handleAcceptDeleteButton} color="primary">
                Agree
            </Button>
            </DialogActions>
        </Dialog>
    )
}

DeleteDialog.propTypes = {
    deleteDialog: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleAcceptDeleteButton: PropTypes.func.isRequired,
    length: PropTypes.number

}

export default memo(DeleteDialog)

