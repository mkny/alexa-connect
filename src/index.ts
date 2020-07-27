import path from "path";
import {
	existsSync,
	readFileSync,
	unlinkSync
} from "fs";
import { spawn } from "child_process";
// import os from "os";

import { translator } from "./constants";

const dir = ["Dropbox","AssistantComputerControl"];
const filename = path.resolve(process.env.HOME ?? "", ...dir, "computerAction.txt");

type translatorKey = keyof typeof translator | string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRegex = (stack: any, str: translatorKey) => stack[Object.keys(stack).find(commandKey => 
	(new RegExp(commandKey)).test(str)
) || str];

const run = () => {
	if(existsSync(filename)){
		readFileSync(filename, "utf-8").split("\n").forEach((contents: translatorKey) => {
			const cmd = getRegex(translator, contents) || contents;

			if(cmd instanceof Array){
				cmd.forEach(cmd => {
					const [bin, ...rest] = cmd.split(" ");
					spawn(bin, rest, { detached: true });
				});
			} else {
				spawn(cmd, { detached: true });
			}
		});
		unlinkSync(filename);
	}
};

setInterval(run, 1500);
