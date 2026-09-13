import type { MetadataRoute } from "next";
import { getDocSlugs } from "@/lib/docs";
import { getPublishedPlugins } from "@/lib/plugins";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const docSlugs = await getDocSlugs();
  const pluginSlugs = getPublishedPlugins().map((plugin) => plugin.slug);

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/docs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...docSlugs.map((slug) => ({
      url: `${SITE_URL}/docs/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/plugins`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...pluginSlugs.map((slug) => ({
      url: `${SITE_URL}/plugins/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
