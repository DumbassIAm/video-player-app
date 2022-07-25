import addLeadingZero from "./addLeadingZero";
import timeDictionary from "constants/timeDictionary";

export default function formatTimestamp(timestamp: number): string {
  let remainder = timestamp;
  if (!remainder) return "000";

  let iterator = 0;

  const arr = [];

  while (remainder > 0) {
    const dictItem = timeDictionary[iterator];
    const piece = remainder % dictItem.delimeter;
    const formattedPiece = addLeadingZero(piece, dictItem.numberOfDigits);

    remainder = (remainder - piece) / dictItem.delimeter;
    arr.push(formattedPiece);

    iterator++;
  }

  const resultString = arr.reverse().join(":");

  return resultString;
}