export function getItemsToAdd(dateObject) {
  let itemOneMonth = dateObject.month + 1;
  let itemOneYear = dateObject.year;
  let itemTwoMonth = dateObject.month + 2;
  let itemTwoYear = dateObject.year;

  if (itemOneMonth === 12) {
    itemOneMonth = 0;
    itemTwoMonth = 1;
    itemOneYear++;
    itemTwoYear++;
  } else if (itemTwoMonth === 12) {
    itemTwoMonth = 0;
    itemTwoYear++;
  }

  return [
    `${itemOneMonth} ${itemOneYear}`,
    `${itemTwoMonth} ${itemTwoYear}`
  ]
}
