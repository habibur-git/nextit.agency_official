import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/login/",
          "/register/",
          "/private/",
          "/cart/",
          "/checkout/",
        ],
      },
    ],
    sitemap: "https://devionex.com/sitemap.xml",
  };
}
