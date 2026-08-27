import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://techwiredsolutions.com.np/sitemap.xml",
    host: "https://techwiredsolutions.com.np",
  };
}
