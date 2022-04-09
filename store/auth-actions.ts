import { AppDispatch } from ".";
import { uiActions } from "./ui-slice";
const headers = {
  "Content-Type": "application/json",
};
export const signUpUser = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      console.log("here");

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          type: "success",
          message: "Successfully signed up!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          type: "error",
          message: "something went wrong",
        })
      );
    }
  };
};
