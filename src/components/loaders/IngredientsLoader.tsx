import ContentLoader from "react-content-loader";
import RectPair from "../rectPair/RectPair";

const IngredientsLoader = ({
  rows = 4,
  columns = 2,
}: {
  rows?: number;
  columns?: number;
}) => {
  const rectPairs = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      rectPairs.push(<RectPair key={`${i}-${j}`} x={j * 205} y={i * 40} />);
    }
  }

  return (
    <div className='ingredients-error'>
      <ContentLoader
        speed={1.5}
        backgroundColor='white'
        foregroundColor='var(--peach)'
        width='100%'
        height='100%'
      >
        {rectPairs}
      </ContentLoader>
    </div>
  );
};

export default IngredientsLoader;
