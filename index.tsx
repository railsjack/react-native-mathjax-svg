import React from "react";
import { SvgFromXml } from "react-native-svg";
const mathjax = require("./mathjax/es5/js/mathjax.js").mathjax;
const TeX = require("./mathjax/es5/js/input/tex.js").TeX;
const SVG = require("./mathjax/es5/js/output/svg.js").SVG;
const liteAdaptor = require("./mathjax/es5/js/adaptors/liteAdaptor.js")
  .liteAdaptor;
const RegisterHTMLHandler = require("./mathjax/es5/js/handlers/html.js")
  .RegisterHTMLHandler;
const PACKAGES =
  "action, ams, amsCd, base, bbox, boldsymbol, braket, cancel, color, configMacros, enclose, extpfeil, mhchem, newcommand, noerrors, noundefined, unicode";
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const params = {
  ex: 8,
  em: 16,
  width: 80,
  inline: true,
  packages: PACKAGES,
  fontCache: true
};

const getScale = _svgString => {
  const svgString = _svgString.match(/<svg([^\>]+)>/gi).join("");

  let [width, height] = (svgString || "")
    .replace(
      /.* width=\"([\d\.]*)[ep]x\".*height=\"([\d\.]*)[ep]x\".*/gi,
      "$1,$2"
    )
    .split(/\,/gi);
  [width, height] = [parseFloat(width), parseFloat(height)];
  return [width, height];
};

const applyScale = (svgString, [width, height]) => {
  let retSvgString = svgString.replace(
    /(<svg[^\>]+height=\")([\d\.]+)([ep]x\"[^\>]+>)/gi,
    `$1${height}$3`
  );
  retSvgString = retSvgString.replace(
    /(<svg[^\>]+width=\")([\d\.]+)([ep]x\"[^\>]+>)/gi,
    `$1${width}$3`
  );
  return retSvgString;
};

const applyColor = (svgString, fillColor) => {
  let retSvgString = svgString.replace(/currentColor/gim, `${fillColor}`);
  return retSvgString;
};

const texToSvg = (textext = "") => {
  if (!textext) {
    return "";
  }
  const tex = new TeX({ packages: params.packages.split(/\s*,\s*/) });
  const svg = new SVG({ fontCache: params.fontCache ? "local" : "none" });
  const html = mathjax.document("", { InputJax: tex, OutputJax: svg });
  const node = html.convert(textext, {
    display: true,
    em: params.em,
    ex: params.ex
  });

  let svgString = adaptor.outerHTML(node) || "";
  svgString = svgString.replace(
    /\<mjx-container.*?\>(.*)\<\/mjx-container\>/gi,
    "$1"
  );

  const [width, height] = getScale(svgString);
  svgString = applyScale(svgString, [width * 10, height * 10]);

  return `${svgString}`;
};

const MathJax = props => {
  const textext = props.children || "";
  let svgXml = texToSvg(textext);
  svgXml = applyColor(svgXml, props.style && props.style.color);
  return <SvgFromXml xml={svgXml} {...props} />;
};

export default MathJax;
