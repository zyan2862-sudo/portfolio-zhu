window.RESEARCH_SCENE = Object.freeze({
  viewBox: Object.freeze({ width: 2048, height: 1153 }),
  // Shared skier and reveal route: upper-right ridge → lower-middle piste.
  path: "M 1650 325 C 1585 352 1535 392 1474 438 C 1412 486 1363 539 1318 596 C 1271 655 1246 713 1223 768 C 1203 810 1191 840 1182 858",
  duration: 12000,
  moveStart: 800,
  moveEnd: 9500,
  holdEnd: 10800,
  resetEnd: 12000,
  mobilePathFraction: 0.78,
  lights: Object.freeze([
    { id: "L01", x: 1648, y: 338, threshold: 0.05, rx: 42, ry: 13, rotate: -38 },
    { id: "L02", x: 1588, y: 384, threshold: 0.14, rx: 46, ry: 14, rotate: -37 },
    { id: "L03", x: 1528, y: 430, threshold: 0.23, rx: 50, ry: 15, rotate: -36 },
    { id: "L04", x: 1470, y: 476, threshold: 0.32, rx: 54, ry: 17, rotate: -35 },
    { id: "L05", x: 1415, y: 524, threshold: 0.41, rx: 59, ry: 18, rotate: -34 },
    { id: "L06", x: 1365, y: 575, threshold: 0.50, rx: 64, ry: 20, rotate: -33 },
    { id: "L07", x: 1320, y: 630, threshold: 0.59, rx: 70, ry: 22, rotate: -31 },
    { id: "L08", x: 1280, y: 688, threshold: 0.68, rx: 76, ry: 23, rotate: -29 },
    { id: "L09", x: 1248, y: 744, threshold: 0.77, rx: 82, ry: 25, rotate: -27 },
    { id: "L10", x: 1220, y: 794, threshold: 0.86, rx: 88, ry: 27, rotate: -25 },
    { id: "L11", x: 1195, y: 838, threshold: 0.95, rx: 94, ry: 29, rotate: -23 }
  ])
});
