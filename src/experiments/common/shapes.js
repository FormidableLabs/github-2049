function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

let rand = mulberry32(101);

export const Square = (size) => {
  const half = size / 2;
  return `
    m .5 .5
    m -${half} -${half}
    l ${size} 0
    l 0 ${size}
    l -${size} 0
    l 0 -${size + 0.5}
    m 0 .5
  `;
};

export const RepeatedSquares = (size) => {
  const CELL_PADDING = 2;
  const CELL_SIZE = 4;
  const cells = size / 6;

  let str = `m -${size / 2} -${size / 2}`;
  str += `m 0 2`;

  for (let x = 0; x < cells; x += 1) {
    for (let y = 0; y < cells; y += 1) {
      if (rand() > 0.5) {
        str += Square(CELL_SIZE, rand() > 0.5);
        str += ` m -.5 -.5`;
        str += ` m ${CELL_SIZE / 2} ${CELL_SIZE / 2}`;
      }
      str += ` m ${CELL_SIZE + CELL_PADDING} 0`;
    }
    str += `m -${Math.ceil(cells) * (CELL_SIZE + CELL_PADDING)} ${
      CELL_SIZE + CELL_PADDING
    }`;
  }
  return str;
};

export const Plus = (size) => {
  const half = size / 2;
  return `
    m .5 .5
    m -${half} -${half}
    m 0 ${half}
    l ${size} 0
    m -${half} -${half}
    l 0 ${size}
  `;
};

export const Circle = (size) => {
  const half = size / 2;
  if (rand() < 0.8) return "";
  return `
    m .5 .5
    m ${size - 1} ${0}
    a ${size} ${size}, 0, 1, 0, ${0} ${0.01}
  `;
};

export const Panel = (width, height, startX = 40, startY = 40) => {

  // rand = mulberry32(9999);

  let pathString = "";

  // pathString += `
  //   M ${startX} ${startY}
  //   m .5 .5
  //   l ${width} 0
  //   l 0 ${height}
  //   l ${-width} 0
  //   l 0 ${-height}
  // `;

  const SPACING_X = 22;
  const SPACING_Y = 22;
  const SIZE_INTERVAL = 2;

  const cellsX = width / (SPACING_X + SIZE_INTERVAL / 2);
  const cellsY = height / (SPACING_Y + SIZE_INTERVAL / 2);

  const items = [Square, RepeatedSquares, Plus, Circle];

  for (var x = 0; x < 2; x += 1) {
    // Draw verticals
    for (var y1 = 1; y1 < cellsY - 1; y1 += 1) {
      if (rand() > 0.3) {
        const posX = x * width;
        const posY = y1 * SPACING_Y;
        pathString += ` M ${startX + posX} ${startY + posY}`;
        const shape = items[Math.floor(rand() * items.length)];
        const size = Math.floor(rand() * 5) * SIZE_INTERVAL;
        pathString += shape(size);
      }
    }
  }

  for (var y = 0; y < 2; y += 1) {
    // Draw horizontals
    for (var x1 = 1; x1 < cellsX - 1; x1 += 1) {
      if (rand() > 0.3) {
        const posX = x1 * SPACING_X;
        const posY = y * height;
        pathString += ` M ${startX + posX} ${startY + posY}`;
        const shape = items[Math.floor(rand() * items.length)];
        const size = Math.floor(rand() * 5) * SIZE_INTERVAL;
        pathString += shape(size);
      }
    }
  }

  return pathString;
};

export const randomSquares = ({ width, height, spacing = 40, sizeInterval = 4 }) => {
  const SPACING_X = spacing;
  const SPACING_Y = spacing;
  const SIZE_INTERVAL = sizeInterval;

  const items = [Square, RepeatedSquares, Plus, Circle];

  let pathString = "";

  for (let x = 0; x < Math.floor(width / SPACING_X); x += 1) {
    for (let y = 0; y < Math.floor(height / SPACING_Y); y += 1) {
      if (rand() > 0.5) {
        pathString += ` M ${x * SPACING_X} ${y * SPACING_Y}`;
        const shape = items[Math.floor(rand() * items.length)];
        const size = Math.floor(rand() * 5) * SIZE_INTERVAL;
        pathString += shape(size);
      } else if (rand() > 0.99) {
        pathString += ` M ${x * SPACING_X} ${y * SPACING_Y}`;
        pathString += ` m 0 .5 m -${SPACING_X / 2} 0 l ${SPACING_X} 0`;
      }
    }
  }

  return pathString;
};
