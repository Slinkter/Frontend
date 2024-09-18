// El return está implícito sino añadimos las llaves.
const getResult = () => "Results";

//Sin arrows functions
const numbers = [1, 2, 3];

numbers.map(function (n) {
  return n * 2;
});

numbers.map((n) => n * 2);

// Ejemplos del this
const counter1 = {
  number: 0,
  increase() {
    setInterval(() => console.log(++this.number), 1000);
  },
};

counter1.increase(); //> 1 2 3 4 5

const counter2 = {
  number: 0,
  increase() {
    setInterval(function () {
      console.log(++this.number);
    }, 1000);
  },
};

counter2.increase(); //> NaN, NaN, NaN, NaN, NaN

const counter3 = {
  number: 0,
  increase() {
    setInterval(
      function () {
        console.log(++this.number);
      }.bind(this),
      1000
    );
  },
};

counter3.increase(); //> 1 2 3 4 5
