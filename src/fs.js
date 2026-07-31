
// wrapper around wrapper.js
import { outEval } from "./wrapper.js";

function arg(value) {
    return JSON.stringify(value);
}

export const fs = {
    exists(path) {
        return outEval(`window.__API.fs.exists(${arg(path)})`);
    },
    isFile(path) {
        return outEval(`window.__API.fs.isFile(${arg(path)})`);
    },
    isDirectory(path) {
        return outEval(`window.__API.fs.isDirectory(${arg(path)})`);
    },
    getTimestamps(path) {
        return outEval(`window.__API.fs.getTimestamps(${arg(path)})`);
    },
    readdir(path) {
        return outEval(`window.__API.fs.listDirectory(${arg(path)})`);
    },
    mkdir(path) {
        return outEval(`window.__API.fs.createDirectory(${arg(path)})`);
    },
    rmdir(path) {
        return outEval(`window.__API.fs.deleteDirectory(${arg(path)})`);
    },
    createFile(path) {
        return outEval(`window.__API.fs.createFile(${arg(path)})`);
    },
    deleteFile(path) {
        return outEval(`window.__API.fs.deleteFile(${arg(path)})`);
    },
    rename(oldPath, newPath) {
        return outEval(`window.__API.fs.rename(${arg(oldPath)}, ${arg(newPath)})`);
    },
    readFile(path) {
        return outEval(`window.__API.fs.openFile(${arg(path)}).read()`);
    },
    writeFile(path, data) {
        return outEval(`window.__API.fs.openFile(${arg(path)}).write(${arg(data)})`);
    },
    appendFile(path, data) {
        return outEval(`window.__API.fs.openFile(${arg(path)}).append(${arg(data)})`);
    },
};

if (typeof window !== "undefined") {
    window.fs = fs;
}
