import { AppDispatch } from ".";
import { hideNotification } from "../helpers/helpers";
import { uiActions } from "./ui-slice";
const headers = {
  "Content-Type": "application/json",
};
export const sendAvatar = (image: any) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      console.log("sending avatar");
      const response = await fetch("api/send-avatar", {
        method: "PUT",
        body: JSON.stringify(image),
        headers,
      });
      if (!response.ok) {
        throw new Error("Changing avatar failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          type: "success",
          message: "Avatar changed!",
        })
      );
      dispatch(uiActions.setAvatar(image));
      hideNotification(dispatch);
    } catch (error: any) {
      dispatch(
        uiActions.showNotification({
          type: "error",
          message: error.message,
        })
      );
      hideNotification(dispatch);
    }
  };
};
