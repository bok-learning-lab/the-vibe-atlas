import { getDoc, type Doc } from "./content";
import { compileDocToComponent } from "./content-page";

export async function getPageContent(folder: string) {
  const doc = getDoc(folder, ["index"]);
  if (!doc) return null;
  const MDXContent = await compileDocToComponent(doc.content);
  return { doc, MDXContent };
}

export type { Doc };
