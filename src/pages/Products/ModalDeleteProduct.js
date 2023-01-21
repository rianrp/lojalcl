import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalDeleteProduct(props) {


  return (
    <div>
      <Dialog
        open={props.openDelete}
        onClose={props.handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Excluir"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você deseja realmente excluir esse produto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={props.handleDelete} color="primary" autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}