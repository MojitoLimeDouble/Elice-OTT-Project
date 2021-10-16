import React from "react";
import ReactWordcloud from "react-wordcloud";
import { Resizable } from "re-resizable";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const resizeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  paddingTop:"10px",
  paddingBottom: "40px",
};

const options = {
  colors: [
    "rgb(116, 206, 227)",
    "rgb(178, 223, 138)",
    "rgb(251, 154, 153)",
    "rgb(253, 191, 111)",
    "rgb(202, 178, 214)",
    "rgb(31, 120, 180)",
    "rgb(51, 160, 44)",
    "rgb(227, 26, 28)",
    "rgb(255, 127, 0)",
    "rgb(106, 61, 154)",
  ],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "NotoSansKR",
  fontSizes: [30, 100],
  fontStyle: "normal",
  fontWeight: 700,
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};

const WordCloudComponent = ({ words }) => {
  return (
    <div>
      <Resizable
        defaultSize={{
          width: 400,
          height: 500,
        }}
        style={resizeStyle}
      >
        <ReactWordcloud options={options} words={words} />
      </Resizable>
    </div>
  );
};

export default WordCloudComponent;
