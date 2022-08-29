export const runSubFunctions = (object, data) => {
  let output = {}
  Object.entries(object).map(([key, value], i) => (output[key] = value(data)))
  return output
}
