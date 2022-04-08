import { AppDispatch } from ".";
const headers = {
  "Content-Type": "application/json",
};
export const singUpUser = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: headers,
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
    } catch (error) {
      alert(error);
    }
  };
};
