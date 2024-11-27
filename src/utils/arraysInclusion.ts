export default function arrayAIncludesFullyArrayB(
  arrayA: string[],
  arrayB: string[]
): boolean {
  return arrayB.every((element) => arrayA.includes(element));
}
