const { error } = require("node:console");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const path = require("node:path");

// try {
//   const file = fs.readFileSync(path.join(__dirname + "/assets/book.pdf"));
//   console.log(file);
//   console.log(file.toString());
// } catch (error) {
//   console.log("\x1b[31m", "ERROR!");
//   console.error(error);
// }

const logError = (error) => {
  console.log("\x1b[31m", "ERROR!");
  console.error(error);
};

const pathToAssets = "assets";
const pathToAssetsDirectory = `./${pathToAssets}`;
const pathToNotesFile = `./${pathToAssets}/notes.txt`;

const readNotesFile = async () => {
  return fsPromises.readFile(pathToNotesFile);
};

const addToNotesFile = async (text) => {
  return fsPromises.appendFile(pathToNotesFile, `${text}`);
};

const writeToNotesFile = async (text) => {
  return fsPromises.writeFile(pathToNotesFile, `${text}`);
};

const deleteNotes = (fileName, text) => {
  return fsPromises.unlink(`${pathToAssetsDirectory}/${fileName}.txt`);
};

const createNotesCopy = (copyName, text) => {
  return fsPromises.writeFile(`${pathToAssetsDirectory}/${copyName}.txt`, `${text}`);
};

const getNotesFileInfo = async () => {
  return fsPromises.stat(pathToNotesFile);
};

const getAssetsFolderInfo = async () => {
  return fsPromises.stat(pathToAssetsDirectory);
};

const getAssetsFiles = async () => {
  return fsPromises.readdir(pathToAssetsDirectory);
};

const createFolder = async (name) => {
  return fsPromises.mkdir(`${pathToAssetsDirectory}/${name}`, { recursive: true });
};

const deleteFolder = async (path) => {
  return fsPromises.rmdir(`${pathToAssetsDirectory}/${path}`, { retryDelay: 1500, maxRetries: 3 });
};

const logFileOrFolderInfo = (name, fileInfo) => {
  const info = {
    ...fileInfo,
    atime: new Date(fileInfo.atimeMs).toLocaleString(),
    mtime: new Date(fileInfo.mtimeMs).toLocaleString(),
    ctime: new Date(fileInfo.ctimeMs).toLocaleString(),
    birthtime: new Date(fileInfo.birthtimeMs).toLocaleString(),
  };
  console.log(`${name}: \n${JSON.stringify(info, null, 2)}`);
};

(async () => {
  try {
    const notesFile = await readNotesFile();
    const notesFileInfo = await getNotesFileInfo();
    const assetsFilesList = await getAssetsFiles();

    console.log(`notes.txt: \n${notesFile.toString()}`);
    logFileOrFolderInfo('notes.txt', notesFileInfo);
    console.log(`Assets folder files: ${assetsFilesList.join(", ")}`);
  } catch (error) {
    logError(error);
  }
})();
