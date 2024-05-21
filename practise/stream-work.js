const fs = require("fs");

const createArticle = () => {
  const writeableStream = fs.createWriteStream("./assets/article.txt");
  writeableStream.write("Title of article");
  writeableStream.write("\nArticle Header 1");
  writeableStream.write("\nArticle paragraph 1");
  writeableStream.write("\nArticle Header 2");
  writeableStream.write("\nArticle paragraph 2");
  writeableStream.write("\nEnd");
};

const logError = (error, errorHead = "ERROR!") => {
  console.log("\x1b[31m", errorHead);
  console.error(error);
};

const readArticle = (fileName) => {
  const readableStream = fs.createReadStream(`./assets/${fileName}`, { encoding: "utf-8" });
  readableStream.on("data", function (chunk) {
    console.log(chunk.toString());
  });

  readableStream.on("ready", function () {
    console.log(`Ready to start reading the ${fileName}`);
  });

  readableStream.on("error", function (error) {
    logError(error, `Failed during reading ${fileName}`);
  });

  readableStream.on("open", function () {
    console.log(`Open ${fileName}`);
  });

  readableStream.on("close", function () {
    console.log(`Close ${fileName}`);
  });

  // readableStream.on("readable", function () {
  //   console.log("Readable");
  // });

  readableStream.on("pause", function () {
    console.log("Readable");
  });

  return readableStream;
};

try {
  // createArticle();
  const stream = readArticle("article.txt");
  setTimeout(() => {
    stream.pause();
  }, 100);
} catch (error) {
  logError(error);
}
