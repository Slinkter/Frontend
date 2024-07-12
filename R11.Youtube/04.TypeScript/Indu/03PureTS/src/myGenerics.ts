const score: Array<number> = []
const names: Array<string> = []

function identityOne(val: boolean | number): boolean | number {
  return val
}

function identityTwo(val: any): any {
  return val
}

function identityThree<Type>(val: Type): Type {
  return val

}
identityThree(true)

function identityFour<T>(val: T): T {
  return val
}

interface Bootle {
  brand: string,
  type: number
}


function getSearchProducts<T>(produts: T[]): T {
  // do some database operations

  const myIndex = 3


  return produts[myIndex]


}


const getMoreSearchProduct = <T>(products: T[]): T => {
  // do some operationss
  const index = 4
  return products[index]
}

























