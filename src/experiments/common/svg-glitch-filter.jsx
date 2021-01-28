import * as React from "react";

// https://codepen.io/DirkWeber/pen/ArFvk

export default function SVGGlitchFilter() {
  return (
    <svg style={{ position: "absolute", width: "100%" }}>
      <defs>
        <filter id="filter">
          <feFlood floodColor="black" result="black" />
          <feFlood floodColor="red" result="flood1" />
          <feFlood floodColor="limegreen" result="flood2" />
          <feOffset in="SourceGraphic" dx="3" dy="0" result="off1a" />
          <feOffset in="SourceGraphic" dx="2" dy="0" result="off1b" />
          <feOffset in="SourceGraphic" dx="-3" dy="0" result="off2a" />
          <feOffset in="SourceGraphic" dx="-2" dy="0" result="off2b" />
          <feComposite in="flood1" in2="off1a" operator="in" result="comp1" />
          <feComposite in="flood2" in2="off2a" operator="in" result="comp2" />

          <feMerge x="0" width="100%" result="merge1">
            <feMergeNode in="black" />
            <feMergeNode in="comp1" />
            <feMergeNode in="off1b" />

            <animate
              attributeName="y"
              id="y"
              dur="4s"
              values="104px; 204px; 300px; 105px; 30px; 2px; 2px; 50px; 400px; 105px; 105px; 20px; 63px; 700px; 104px; 40px; 70px; 10px; 400px; 104px; 102px"
              keyTimes="0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1"
              repeatCount="indefinite"
            />

            <animate
              attributeName="heigha"
              id="h"
              dur="4s"
              values="10px; 0px; 10px; 30px; 50px; 0px; 10px; 0px; 0px; 0px; 10px; 50px; 40px; 0px; 0px; 0px; 40px; 30px; 10px; 0px; 50px"
              keyTimes="0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1"
              repeatCount="indefinite"
            />
          </feMerge>

          <feMerge x="0" width="100%" y="60px" height="65px" result="merge2">
            <feMergeNode in="black" />
            <feMergeNode in="comp2" />
            <feMergeNode in="off2b" />

            <animate
              attributeName="y"
              id="y"
              dur="4s"
              values="103px; 104px; 69px; 53px; 42px; 104px; 78px; 89px; 96px; 100px; 67px; 50px; 96px; 66px; 88px; 42px; 13px; 100px; 100px; 104px;"
              keyTimes="0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513; 0.548; 0.577; 0.613; 1"
              repeatCount="indefinite"
            />

            <animate
              attributeName="height"
              id="h"
              dur="4s"
              values="0px; 0px; 0px; 16px; 16px; 12px; 12px; 0px; 0px; 5px; 10px; 22px; 33px; 11px; 0px; 0px; 10px"
              keyTimes="0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513;  1"
              repeatCount="indefinite"
            />
          </feMerge>

          <feMerge>
            <feMergeNode in="SourceGraphic" />

            <feMergeNode in="merge1" />
            <feMergeNode in="merge2" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
