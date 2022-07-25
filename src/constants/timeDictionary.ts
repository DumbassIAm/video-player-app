type timeDictionary = {
  name: string,
  delimeter: number,
  numberOfDigits: number,
}[];

const timeDictionary: timeDictionary = [
  {
    name: "milliseconds",
    delimeter: 1000,
    numberOfDigits: 3,
  },
  {
    name: "seconds",
    delimeter: 60,
    numberOfDigits: 2,
  },
  {
    name: "minutes",
    delimeter: 60,
    numberOfDigits: 2,
  },
  {
    name: "hours",
    delimeter: 60,
    numberOfDigits: 2,
  },
  {
    name: "days",
    delimeter: 24,
    numberOfDigits: 3,
  },
]

export default timeDictionary;