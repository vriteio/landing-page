import { trackSignUp } from "#components/fragments/analytics";
import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { validateEmail } from "./utils";

const [emailContext, setEmailContext] = createStore({
  modalOpened: false,
  success: false,
  error: "",
  email: "",
});
const isEmailCorrect = createMemo(() => {
  return validateEmail(emailContext.email);
});
const setEmail = (email: string) => {
  setEmailContext({ email, error: "" });
};
const setEmailModal = (opened: boolean, success?: boolean) => {
  if (typeof success === "boolean") {
    setEmailContext("success", success || false);
  }

  if (opened) {
    document.body.style.overflowY = "hidden";
    setEmailContext("modalOpened", true);
  } else {
    document.body.style.overflowY = "unset";
    setEmailContext({
      email: "",
      modalOpened: false,
      success: false,
      error: "",
    });
  }
};
const submitEmailForm = async (): Promise<boolean> => {
  if (isEmailCorrect()) {
    const response = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({ email: emailContext.email }),
    });
    const result = await response.json();

    setEmailContext({
      success: result.success,
      error: result.success ? "" : "Form submission failed",
    });
    trackSignUp();

    return result.success;
  }
  setEmailContext("error", "Email is incorrect");

  return false;
};

export {
  emailContext,
  setEmailModal,
  setEmail,
  isEmailCorrect,
  submitEmailForm,
};
