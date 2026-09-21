function greeting() {
  let username = "liam";
  /* ------------> */
  function displayUserName() {
    return `hello ${username}`;
  }
  return displayUserName();
  /* <------------ */
}

const g = greeting();
console.log(g);
