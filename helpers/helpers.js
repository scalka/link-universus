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

/**
 * Creates nested groups by object properties.
 * `properties` array nest from highest(index = 0) to lowest level.
 * @param {arr} arr - array of objects
 * @param {String[]} properties
 * @returns {Object}
 */
export function nestedGroupsBy(arr, properties) {
  properties = Array.from(properties);
  if (properties.length === 1) {
    return groupBy(arr, properties[0]);
  }
  const property = properties.shift();
  var grouped = groupBy(arr, property);
  for (let key in grouped) {
    grouped[key] = nestedGroupsBy(grouped[key], Array.from(properties));
  }
  return grouped;
}
