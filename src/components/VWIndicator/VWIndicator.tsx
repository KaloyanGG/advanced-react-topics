import React, { useEffect, useState } from "react";
import "./VWIndicator.css";

const VwIndicator: React.FC = () => {
  const [vwInPixels, setVwInPixels] = useState(window.innerWidth / 100);

  useEffect(() => {
    const updateVw = () => setVwInPixels(window.innerWidth / 100);
    window.addEventListener("resize", updateVw);

    updateVw();

    return () => window.removeEventListener("resize", updateVw);
  }, []);

  return <div className='vw-indicator'>1vw = {vwInPixels.toFixed(2)}px</div>;
};

export default VwIndicator;
