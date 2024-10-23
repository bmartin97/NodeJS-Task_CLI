const { updateDb, readDb } = require("./fs_utils");

const Task = require("./task");

/**
 * Adds a new task and updates the db.json
 * @param {string} description Description of the new task
 */
async function addTask(description) {
  const data = await readDb();

  const isFirstTask = data.length === 0;
  const nextId = isFirstTask ? 1 : data[data.length - 1].id + 1;

  data.push(new Task(nextId, description, "todo"));

  updateDb(data);
}

/**
 * Updates the status of the task by the given id
 * @param {*} id Id of the task that should been updated
 * @param {*} status The new status of the task
 */
async function updateStatus(id, status) {
  const data = await readDb();

  const taskId = data.findIndex((task) => task.id === id);

  if (taskId !== -1) {
    data[taskId].updateStatus(status);

    await updateDb(data);

    console.log(
      "The status of the task with the following id has been updated: " + id
    );
  } else {
    console.error("Could not found the task with the following id: " + id);
  }
}

/**
 * Deletes the task with the given id.
 * @param {*} id Id of the task that should been deleted
 */
async function deleteTask(id) {
  const data = await readDb();

  const filteredData = data.filter((task) => task.id !== id);
  const isDeletedData = filteredData.length !== data.length;

  if (isDeletedData) {
    await updateDb(data);

    console.log(
      "The task with the following id has been removed succesfully: " + id
    );
  } else {
    console.error("Could not found the task with the following id: " + id);
  }
}

/**
 *
 * @param {Object} options
 * @param {"todo" | "in_progress" | "done" | "all"} options.status
 * @param {"id" | "description" | "status" | "createdAt" | "updatedAt" } options.sortBy
 * @param {"asc" | "desc" } options.order
 *
 * @todo sortBy, Order
 */
async function list(
  options = {
    status: "all",
    sortBy: "createdAt",
    order: "asc",
  }
) {
  let data = await readDb();

  // Filter
  if (options.status !== "all") {
    data = data.filter((task) => task.status === options.status);
  }

  data.map((t) => console.log(t.toString()));
}
