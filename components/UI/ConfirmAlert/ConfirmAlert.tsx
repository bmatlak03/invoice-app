import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { uiActions } from "../../../store/ui-slice";
import { deleteInvoice } from "../../../store/invoices-actions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import StyledButton from "../StyledButton/StyledButton";
type Props = {
  id: string;
};

const ConfirmAlert = ({ id }: Props) => {
  const open = useSelector((state: RootState) => state.ui.isDeleteConfirmOpen);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(uiActions.closeDeleteConfirm());
  const handleDelete = () => dispatch(deleteInvoice(id));
  return (
    <>
      <Dialog open={open} onClose={handleClose} sx={{ borderRadius: "10px" }}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete invoice #{id}? This Action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton type="grey" onClick={handleClose}>
            Disagree
          </StyledButton>
          <StyledButton type="red" onClick={handleDelete}>
            Delete
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ConfirmAlert;
