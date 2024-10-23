const { resolve, join } = require("node:path");
const { readFile, writeFile } = require("node:fs/promises");

const Task = require("./task");

const DATA_DIR = join(__dirname, "data");
const FILE_PATH = resolve(join(DATA_DIR, "db.json"));
/**
 * Overrides the db.json with the given data
 * @param {Task[]} data Array of Task objects
 */
function updateDb(data) {
  const data = JSON.stringify(data, null, 4);

  writeFile(FILE_PATH, data, { encoding: "utf8" }).catch(throwError);
}

/**
 * Reads the db.json and parses it to Array of Task objects.
 * @returns {Task[]} Array of Task objects
 */
async function readDb() {
  return readFile(FILE_PATH, { encoding: "utf8" })
    .then((data) => JSON.parse(data).map(Task.parseJson))
    .catch(throwError);
}

function throwError(err) {
  console.error(new Error(err));
}

module.exports = {
  updateDb,
  readDb,
};
