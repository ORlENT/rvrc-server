export default class ValidationError extends Error {
  constructor(id, message) {
    super(message);
    this.name = "ValidationError";
    this.id = id;
  }
}
