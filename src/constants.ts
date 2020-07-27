import { getChromeTabs } from "./modules/chrome";

const translator = {
	"^open_all(.*)": [...getChromeTabs(), "slack", "code /home/marcony/git/front-end/"]
};


export { translator };