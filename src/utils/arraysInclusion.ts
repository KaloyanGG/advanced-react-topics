const arrayAIncludesFullyArrayB = (
  arrayA: string[],
  arrayB: string[]
): boolean => {
  return arrayB.every((element) => arrayA.includes(element));
};

export default arrayAIncludesFullyArrayB;
