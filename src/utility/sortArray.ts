import TimecodesInterface from "../types";

type returnType = TimecodesInterface[] | null;

export default function sortArray(arr: TimecodesInterface[], dir: string,): returnType {
  if (dir === "ascend") {
    return arr.sort((a, b) => a.timestamp - b.timestamp);
  }

  if (dir === "descend") {
    return arr.sort((a, b) => a.timestamp + b.timestamp);
  }

  return null;
}