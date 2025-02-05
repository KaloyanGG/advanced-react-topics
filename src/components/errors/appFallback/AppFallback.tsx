import { useErrorBoundary } from "react-error-boundary";
import "./AppFallback.css";
import { useEffect } from "react";

const AppFallback = () => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className='app-fallback'>
      <h1>There was an error...</h1>
      <button type='button' onClick={resetBoundary}>
        Refresh
      </button>
    </div>
  );
};

export default AppFallback;
