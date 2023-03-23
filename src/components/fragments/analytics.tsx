import type { Component } from "solid-js";
import Plausible from "plausible-tracker";

const plausibleConfig = {
  trackLocalhost: false,
  domain: "vrite.io",
};
const trackSignUp = () => {
  const { trackEvent } = Plausible(plausibleConfig);

  trackEvent("sign-up");
};
const Analytics: Component = () => {
  const { trackPageview } = Plausible(plausibleConfig);

  trackPageview();

  return <></>;
};

export { Analytics, trackSignUp };
