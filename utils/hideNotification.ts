import { AppDispatch } from "../store";
import { uiActions } from "../store/ui-slice";
const notificationTime = 4000;
export const hideNotification = (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(uiActions.hideNotification());
  }, notificationTime);
};
