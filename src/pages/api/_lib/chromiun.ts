import puppeteer, { Page } from "puppeteer-core";
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
  width?: number;
  height?: number;
};

export async function getScreenshot({
  html,
  isDev,
  width = 1080,
  height = 1920,
}: getScreenshotProps) {
  const page = await getPage(isDev);

  await page.setViewport({ width, height });
  await page.setContent(html);

  const file = await page.screenshot({ type: "png" });

  return file;
}
