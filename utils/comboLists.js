// Lists ordered alphabetically for multiselect.
// Used in stores.
export function getComboLists(list) {
  // we are only interested in the _id property
  const newArray = list.map((obj) => ({ _id: obj._id }));

  // we sort the array
  newArray.sort((a, b) => a._id.localeCompare(b._id));

  return newArray;
}
