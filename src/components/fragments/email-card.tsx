import { Button } from "#components/primitives/button";
import { Card } from "#components/primitives/card";
import { Input } from "#components/primitives/input";
import { Loader } from "#components/primitives/loader";
import {
  submitEmailForm,
  setEmailModal,
  emailContext,
  setEmail,
  isEmailCorrect,
} from "#lib/email";
import clsx from "clsx";
import { createSignal } from "solid-js";

const EmailCard = () => {
  const [processing, setProcessing] = createSignal(false);
  const handleSubmitEmailForm = async () => {
    setProcessing(true);
    await submitEmailForm();
    setEmailModal(true);
    setProcessing(false);
  };

  return (
    <Card
      color="primary"
      class="max-w-screen-xl w-full p-8 m-0 md:p-16 relative flex justify-center items-center flex-col text-center"
    >
      <h2 class="text-3xl md:text-4xl mb-4">Request access</h2>
      <div class="max-w-[26rem] w-full justify-center flex flex-col items-center">
        <div class="items-center justify-start w-full gap-2 flex flex-col md:flex-row mb-2">
          <Input
            value={emailContext.email}
            setValue={(value) => setEmail(value)}
            placeholder="Email"
            wrapperClass="flex-1 w-full md:w-auto"
            class="!m-0 h-11 text-lg text-gray-900 dark:text-white"
            type="email"
            onEnter={handleSubmitEmailForm}
          />
          <Button
            class="flex items-center justify-center m-0 whitespace-nowrap w-full md:w-auto"
            disabled={!isEmailCorrect()}
            size="large"
            onClick={handleSubmitEmailForm}
            text="soft"
          >
            <span class={clsx(processing() && "invisible")}>Submit</span>
            {processing() && <Loader class="absolute" />}
          </Button>
        </div>
        <p class="max-w-[20rem]">
          Sign up for access to the Private Beta of Vrite. We'll send you an
          invite soon after.
        </p>
      </div>
    </Card>
  );
};

export { EmailCard };
