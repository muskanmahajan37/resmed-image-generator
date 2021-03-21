import { IncomingMessage } from "http";
import { parse } from "url";

export interface ParsedRequest {
  text: string;
  extension: string;
}

export function parseRequest(req: IncomingMessage) {
  const { pathname } = parse(req.url || "/");

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    text: decodeURIComponent(text),
    extension,
  };

  return parsedRequest;
}
