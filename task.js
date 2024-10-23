class Task {
  /**
   * Constructor of the Task object
   * @param {number} id
   * @param {string} description
   * @param {"todo" | "in_progress" | "done"} status
   */
  constructor(id, description, status) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Updates the status with a new value and the updatedAt with the current date
   * @param {"todo" | "in_progress" | "done"} status
   * @returns {Task}
   */
  updateStatus(status) {
    this.status = status;
    this.updatedAt = new Date();

    return this;
  }

  toString() {
    return [
      this.id,
      this.description.padEnd(25, " "),
      this.status.padStart(11, " "),
      this.updatedAt.toDateString(),
    ].join(" | ");
  }

  /**
   * Parse general JSON object to Task class object
   *
   * @param {Object} obj
   * @param {number | string} obj.id
   * @param {string} obj.description
   * @param {string} obj.status
   * @param {string} obj.createdAt
   * @param {string} obj.updatedAt
   * @returns {Task}
   */
  static parseJson(obj) {
    const newObj = new Task();

    newObj.id = Number(obj.id);
    newObj.description = obj.description;
    newObj.status = obj.status;
    newObj.createdAt = new Date(obj.createdAt);
    newObj.updatedAt = new Date(obj.updatedAt);

    return newObj;
  }
}

module.exports = Task;
