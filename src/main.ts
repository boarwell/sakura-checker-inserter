import { extractID, getTarget, createIframe, isAmazonJP } from "./utils";

(function main() {
  const url = location.href;
  if (!isAmazonJP(url)) {
    return;
  }

  const resultID = extractID(url);
  if (!resultID.ok) {
    console.log(resultID.message);
    return;
  }

  const resultTarget = getTarget();
  if (!resultTarget.ok) {
    console.log(resultTarget.message);
    return;
  }

  window.requestIdleCallback(() => {
    const iframe = createIframe(resultID.value);
    const target = resultTarget.value;
    target.parentNode?.insertBefore(iframe, target);
  });
})();
