type Result<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      message: string;
    };

export function getTarget(): Result<Element> {
  const TARGET_SELECTOR = "#hover-zoom-end";
  const target = document.querySelector(TARGET_SELECTOR);

  if (target === null) {
    return {
      ok: false,
      message: `${TARGET_SELECTOR} doesn't exists.`,
    };
  }

  return {
    ok: true,
    value: target,
  };
}

export function extractID(url: string): Result<string> {
  // URLs can be patterns like:
  // /dp/XXXXXXXXXX?foo=XXXXXX
  // /gp/product/XXXXXXXXXX/?foo=XXXXXX
  const pattern = /\/([A-Z0-9]{10})/;
  const matched = pattern.exec(url);
  if (matched === null) {
    return {
      ok: false,
      message: `Failed to extract the product ID from ${url}.`,
    };
  }

  return { ok: true, value: matched[1] };
}

export function createIframe(id: string): HTMLIFrameElement {
  const i = document.createElement("iframe");

  i.src = `https://sakura-checker.jp/search/${id}/`;
  i.style.border = "0";
  i.style.width = "100%";
  i.style.height = "600px";
  i.setAttribute("sandobx", "");

  return i;
}

export function isAmazonJP(href: string): boolean {
  const AMAZON_JP_HOSTNAME_PATTERN = /www\.amazon\.co\.jp/;
  const { hostname } = new URL(href);

  return AMAZON_JP_HOSTNAME_PATTERN.test(hostname);
}
