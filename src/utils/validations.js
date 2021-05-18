let required = propertyType => {
  return p => (p && p.length > 0) || `The field ${propertyType} is required`;
};
let minLength = (propertyType, min) => {
  return p =>
    (p && p.length >= min) ||
    `${propertyType} must be at least ${min} characters`;
};
let maxLength = (propertyType, max) => {
  return p =>
    (p && p.length <= max) ||
    `${propertyType} must be less than ${max} characters`;
};
let imageRequired = () => {
  return p =>
    (p && p.id === undefined && p.imageUrl === undefined) ||
    "The Image is required";
};
let imageSize = () => {
  return value =>
    !value || value.size < 1000000 || "Avatar size should be less than 1 MB!";
};
let isEmail = () => {
  // let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/; // error
  // let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // poc fiable
  let validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // prou be
  return v => (v && validRegex.test(v)) || "Must be a valid email";
};

export default {
  required,
  minLength,
  maxLength,
  imageRequired,
  imageSize,
  isEmail
};
