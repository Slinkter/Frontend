// for old
const lettersOld = ["a", "b", "c"];
for (let index = 0; index < lettersOld.length; index++) {
  const element = lettersOld[index];
  console.log(element);
}
// for new
const lettersNew = ["z", "x", "y"];
lettersNew.forEach((element) => console.log(element));
