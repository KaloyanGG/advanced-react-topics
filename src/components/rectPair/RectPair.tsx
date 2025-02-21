import React from "react";

const RectPair = ({ x, y }: { x: number; y: number }) => {
  return (
    <>
      <rect x={x} y={y} rx='3' ry='3' width='155' height='30' />
      <rect x={x + 165} y={y} rx='3' ry='3' width='30' height='30' />
    </>
  );
};

export default RectPair;
