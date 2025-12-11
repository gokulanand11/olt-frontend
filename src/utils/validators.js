export const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
export const strongPassword = (v) => v && v.length >= 8;