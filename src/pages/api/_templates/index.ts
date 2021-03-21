import { generateFacebookFeedTemplate } from "./facebookfeed";
import { generateInstagramFeedTemplate } from "./instafeed";
import { generateStorieTemplate } from "./storie";

type GetTemplateImages = {
  coupon: string;
  typeImage: string;
};

const TYPES = {
  storie: generateStorieTemplate,
  instafeed: generateInstagramFeedTemplate,
  facebookfeed: generateFacebookFeedTemplate,
};

export const getTemplateImages = ({ typeImage, coupon }: GetTemplateImages) => {
  try {
    const template = TYPES[typeImage]?.(coupon);

    if (!template) {
      throw new Error(`Template "${typeImage}" not found`);
    }

    return template;
  } catch (err) {
    throw err;
  }
};
