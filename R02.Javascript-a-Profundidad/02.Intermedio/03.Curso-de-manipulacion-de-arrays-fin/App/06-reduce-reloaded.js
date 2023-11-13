/* ========================================= */
const items = [1, 3, 2, 3, 3, 3, 3];
//
const rta = items.reduce((obj, item) => {
  // si no existe crear y asinar 1
  // si existe sumar  +1
  if (!obj[item]) {
    obj[item] = 1;
  } else {
    obj[item] += 1;
  }
  return obj;
}, {});
console.log(rta);
/* ========================================= */
const data = [
  {
    name: "Nicolas",
    level: "low",
  },
  {
    name: "Andrea",
    level: "medium",
  },
  {
    name: "Zulema",
    level: "hight",
  },
  {
    name: "Santiago",
    level: "low",
  },
  {
    name: "Valentina",
    level: "medium",
  },
  {
    name: "Lucia",
    level: "hight",
  },
];

const rta1 = data
  .map((item) => item.level)
  .reduce((obj, item) => {
    if (!obj[item]) {
      obj[item] = 1;
    } else {
      obj[item] = obj[item] + 1;
    }
    return obj;
  }, {});

console.log(rta1);
