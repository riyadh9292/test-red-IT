class MissingFieldError extends Error {
    constructor(field, type) {
      super(`Missing required field: ${field} in ${type}`);
      this.name = 'MissingFieldError';
      this.field = field;
      this.type = type;
      this.code = 400;
    }
  }
  
  export { MissingFieldError };
  