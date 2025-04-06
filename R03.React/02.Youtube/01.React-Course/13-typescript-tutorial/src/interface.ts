enum Color {
  Red, Blue,
  //Green,
}

function getColorName(color: Color) {
  switch (color) {
    case Color.Red:
      return "Red"
    case Color.Blue:
      return "Blue"
    default:
      let unexpectedColor: never = color
      throw new Error(`unexpected color value :   ${unexpectedColor}`)
  }
}

console.log(getColorName(Color.Red));
