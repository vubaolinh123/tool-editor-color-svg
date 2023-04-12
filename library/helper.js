export const getAllSvgColors = (svgString) => {
  let colors = [];
  colors.push(...getAllRgbColors(svgString));
  colors.push(...getColorsFromStyleFill(svgString));
  colors.push(...getColorsFromFillAttributes(svgString));
  colors = [...new Set(colors)];
  return colors;
};

const getAllRgbColors = (svgString) => {
  let colors = [];
  if (svgString) {
    let findRgb = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/gi;
    colors = svgString.match(findRgb) || [];
  }
  return colors;
};

const getColorsFromStyleFill = (svgString) => {
  let colors = [];
  if (svgString) {
    svgString.replace(/(#[abcdef0-9]{3,6})/gi, (v, c) => {
      colors.push(c);
      return v;
    });
  }
  return colors;
};

const getColorsFromFillAttributes = (svgString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");

  const elements = getAllElementsWithAttributes(doc, ["fill", "style"]);

  const colors = [];

  elements.forEach((e) => {
    const color = e.getAttribute("fill");
    if (color && color != "none" && colors.indexOf(color) === -1) {
      colors.push(color);
    }

    const styleAttr = e.getAttribute("style");
    let color2 = null;
    if (styleAttr) {
      color2 = getColorsFromFill(styleAttr);
    }
    if (color2 && colors.indexOf(color2) === -1) {
      colors.push(color2);
    }
  });
  return colors;
};

const getColorsFromFill = (inputString) => {
  let res = null;
  if (inputString) {
    inputString.replace(/fill:(#[abcdef0-9]{3,6})/gi, (v, c) => {
      res = c;
      return v;
    });
  }

  return res;
};

const getAllElementsWithAttributes = (doc, [fill, style]) => {
  let matchingElements = [];
  let allElements = doc.getElementsByTagName("*");

  for (let i = 0, n = allElements.length; i < n; i++) {
    if (
      allElements[i].getAttribute(fill) ||
      allElements[i].getAttribute(style)
    ) {
      matchingElements.push(allElements[i]);
    }
  }

  return matchingElements;
};

export const replaceAllStringColor = (svgString, map) => {
  Object.keys(map).map((key) => {
    svgString = svgString.split(key).join(map[key]);
  });

  return svgString;
};


export const svgToBase64 = (svgString) => {
    return "data:image/svg+xml;base64," + window.btoa(svgString)
}