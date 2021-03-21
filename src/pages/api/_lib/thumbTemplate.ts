import { getTemplateImages } from "../_templates";

type getThumbnailTemplate = {
  coupon: string;
  typeImage: string;
};

export default function getTemplate({
  coupon,
  typeImage,
}: getThumbnailTemplate) {
  return getTemplateImages({ coupon, typeImage });
}
