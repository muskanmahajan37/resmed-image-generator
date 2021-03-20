import { NextApiRequest, NextApiResponse } from "next";
import { getScreenshot } from "./_lib/chromiun";
import getThumbnailTemplate from "./_lib/thumbTemplate";

const isDev = !process.env.AWS_REGION;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const coupon = req.query.coupon ? String(req.query.coupon) : null;
    // const width = Number(req.query.width) || 1080;
    // const height = Number(req.query.height) || 1920;

    if (!coupon) {
      throw new Error("Coupon is required.");
    }

    const html = getThumbnailTemplate(coupon);

    const file = await getScreenshot({
      html,
      isDev,
      // width,
      // height
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

    return res.status(500).send(`Error: ${err.message}`);
  }
}
