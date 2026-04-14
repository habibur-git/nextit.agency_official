/** Logos in `public/assets/img/brand/` (paths are URL-safe). */
const brand = (filename: string) =>
  `/assets/img/brand/${encodeURIComponent(filename)}`;

export const brandLogos: string[] = [
  brand("BMI@nextitagency.png"),
  brand("BSEP@nextitagency.png"),
  brand("BrightBuild@nextitagency.png"),
  brand("Emaco@nextitagency.png"),
  brand("Fooddictionary@nextitagency.png"),
  brand("Unimark@nextitagency.png"),
  brand("arabian@nextitagency.png"),
  brand("isfatex@nextitagency.png"),
  brand("রিডার্স পাবরিকেশন@nextitagency.png"),
];
