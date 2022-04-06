import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { uiActions } from "../../../store/ui-slice";
import StyledButton from "../StyledButton/StyledButton";
import { deleteInvoice } from "../../../store/invoices-actions";
import { truncateObjectId } from "../../../helpers/helpers";
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
            Are you sure you want to delete invoice #{truncateObjectId(id, 10)}?
            This Action cannot be undone.
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
