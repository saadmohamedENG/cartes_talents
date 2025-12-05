const Validators = {
  required(value) {
    return value != null && String(value).trim().length > 0;
  },
};
