import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://realtime-chat-app-manthan.vercel.app/sitemap.xml",
  };
}
