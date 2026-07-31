import { outEval } from "./wrapper.js";
// simple text editor from iframeos
export const editor = {
    editFile(path) {
        return outEval(`window.__API.editor.editFile(${JSON.stringify(path)})`);
    },
};
