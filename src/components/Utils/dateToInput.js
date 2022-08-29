export const dateToInput = (date) =>
  new Date(date).toLocaleDateString().split('/').reverse().join('-')
