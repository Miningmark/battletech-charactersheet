//Values are in kg
export const encumbranceTable = [
  { str: 0, encumbered: 0.1, veryEncumbered: 0.5, overloaded: 1 },
  { str: 1, encumbered: 5, veryEncumbered: 10, overloaded: 15 },
  { str: 2, encumbered: 10, veryEncumbered: 20, overloaded: 25 },
  { str: 3, encumbered: 15, veryEncumbered: 30, overloaded: 50 },
  { str: 4, encumbered: 20, veryEncumbered: 40, overloaded: 75 },
  { str: 5, encumbered: 30, veryEncumbered: 60, overloaded: 100 },
  { str: 6, encumbered: 40, veryEncumbered: 80, overloaded: 125 },
  { str: 7, encumbered: 55, veryEncumbered: 110, overloaded: 150 },
  { str: 8, encumbered: 70, veryEncumbered: 140, overloaded: 200 },
  { str: 9, encumbered: 85, veryEncumbered: 170, overloaded: 250 },
  { str: 10, encumbered: 100, veryEncumbered: 200, overloaded: 300 },
  {
    str: 11,
    encumbered: (str) => str * 15,
    veryEncumbered: (str) => str * 30,
    overloaded: (str) => str * 45,
  },
];

export function getEncumberedValue(str) {
  const entry = encumbranceTable.find((e) => e.str === str);

  if (entry) {
    return typeof entry.encumbered === "function" ? entry.encumbered(str) : entry.encumbered;
  } else if (str > 11) {
    const lastEntry = encumbranceTable[encumbranceTable.length - 1];
    return lastEntry.encumbered(str);
  } else {
    return null;
  }
}
