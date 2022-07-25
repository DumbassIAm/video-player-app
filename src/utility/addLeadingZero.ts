type returnType = string | number;

export default function addLeadingZero(number: number, numberOfDigits: number): returnType {
  const compareValue = 10 ** (numberOfDigits - 1);

  const numberOfZeros = numberOfDigits - number.toString().length;
  const prefixZero = "0".repeat(numberOfZeros);

  return number < compareValue ? `${prefixZero}${number}` : number;
}