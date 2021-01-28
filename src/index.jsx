import React from "react";
import { render } from "react-dom";

import WebGL from "./experiments/webgl";
import Canvas from "./experiments/canvas";
import SVG from "./experiments/svg";

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

const Comp = { svg: SVG, canvas: Canvas, webgl: WebGL }[mode] || WebGL;

render(<Comp />, document.getElementById("app"));
