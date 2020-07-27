import { resolve } from "path";
import { readFileSync } from "fs";

const googleFavs = resolve(process.env.HOME ?? "",".config","google-chrome","Default", "Bookmarks");

interface BookmarkType {
  date_added: string;
  date_modified: string;
  guid: string;
  id: string;
  name?: string;
  type: string;
  url?: string;
  children?: BookmarkType[]
}
interface BookmarkGeneral {
  roots: {
    bookmark_bar: {
      children: BookmarkType[]
    }
  }
}
const getChromeFavs = (): BookmarkType["url"][] => {
	const chromes = readFileSync(googleFavs, "utf-8");
	const cms: BookmarkGeneral = JSON.parse(chromes);
	const [f01] = cms.roots.bookmark_bar.children.filter(({type}) => type === "folder");
	return f01?.children?.filter(({type}) => type === "url").map(({url}) => url) ?? [];
  
};

const getChromeTabs = (): string[] => getChromeFavs().map((url = "") => `google-chrome ${url}`);

export { getChromeTabs, getChromeFavs };
