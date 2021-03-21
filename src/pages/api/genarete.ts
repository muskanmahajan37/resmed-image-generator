import { NextApiRequest, NextApiResponse } from "next";

import { TypesImages } from "./configs/typesImage";
import { getScreenshot } from "./_lib/chromiun";
import { parseRequest } from "./_lib/parser";
import { sanitizeHtml } from "./_lib/sanitizer";
import getTemplate from "./_lib/thumbTemplate";

const isDev = !process.env.AWS_REGION;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const parsedReq = parseRequest(req);

    const coupon = parsedReq.text ? sanitizeHtml(parsedReq.text) : null;

    const isHtmlDebug = req.query.debug === "true";

    const typeImage = req.query.template
      ? String(req.query.template)
      : TypesImages.storie.type;

    if (!coupon) {
      throw new Error("Coupon is required.");
    }

    const html = getTemplate({
      coupon,
      typeImage,
    });

    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);

      return;
    }

    const file = await getScreenshot({
      html,
      isDev,
      typeImage,
    });

    res.statusCode = 200;

    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    );

    return res.end(file);
  } catch (err) {
    console.log(err);

    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<h1 style="font-family: Arial">Ocorreu um erro.</h1><p style="font-family: Arial">Erro: <b>${err.message}</b></p>`
    );
  }
}
