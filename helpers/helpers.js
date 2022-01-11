/**
 * Group array into object with key value pairs
 * @param {arr} arr - array of objects
 * @param {string} criteria - key on which to group ex. id, categort
 * @returns objects grouped by criteria
 */
export function groupBy(arr, criteria) {
  const newObj = arr.reduce(function (acc, currentValue) {
    if (!acc[currentValue[criteria]]) {
      acc[currentValue[criteria]] = [];
    }
    acc[currentValue[criteria]].push(currentValue);
    return acc;
  }, {});

  return newObj;
}
