import puppeteer, { Page } from "puppeteer-core";
import { TypesImages } from "../configs/typesImage";
import { getOptions } from "./chromiunOptions";

let _page: Page | null;

async function getPage(isDev: boolean): Promise<Page> {
  if (_page) {
    return _page;
  }

  const options = await getOptions(isDev);
  const browser = await puppeteer.launch(options);

  _page = await browser.newPage();

  return _page;
}

type getScreenshotProps = {
  html: string;
  isDev: boolean;
  typeImage: string;
};

export async function getScreenshot({
  html,
  isDev,
  typeImage,
}: getScreenshotProps) {
  const page = await getPage(isDev);

  await page.setViewport({
    width: TypesImages[typeImage].sizes.width,
    height: TypesImages[typeImage].sizes.height,
  });

  await page.setContent(html);

  const file = await page.screenshot({ type: "png" });

  return file;
}
