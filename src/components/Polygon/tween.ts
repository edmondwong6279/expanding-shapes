const easeOutBounce = (x: number) => {
  let new_x = x;
  const n1 = 7.5625;
  const d1 = 2.75;

  if (new_x < 1 / d1) {
    return n1 * new_x * new_x;
  } else if (new_x < 2 / d1) {
    return n1 * (new_x -= 1.5 / d1) * new_x + 0.75;
  } else if (new_x < 2.5 / d1) {
    return n1 * (new_x -= 2.25 / d1) * new_x + 0.9375;
  } else {
    return n1 * (new_x -= 2.625 / d1) * new_x + 0.984375;
  }
};

export const tweenList = [
  "linear",
  "easeInSine",
  "easeOutSine",
  "easeInOutSine",
  "easeInQuad",
  "easeOutQuad",
  "easeInOutQuad",
  "easeInCubic",
  "easeOutCubic",
  "easeInOutCubic",
  "easeInBack",
  "easeOutBack",
  "easeInOutBack",
  "easeInElastic",
  "easeOutElastic",
  "easeInOutElastic",
  "easeOutBounce",
  "easeInBounce",
  "easeInOutBounce",
];

const tween = (
  x: number,
  duration: number,
  maximum: number,
  easeType = "linear"
) => {
  if (x > duration) return maximum;
  const new_x = x / duration;
  let result = 0;
  if (easeType === tweenList[0]) {
    result = new_x;
  } else if (easeType === tweenList[1]) {
    result = 1 - Math.cos((new_x * Math.PI) / 2);
  } else if (easeType === tweenList[2]) {
    result = Math.sin((new_x * Math.PI) / 2);
  } else if (easeType === tweenList[3]) {
    result = -(Math.cos(Math.PI * new_x) - 1) / 2;
  } else if (easeType === tweenList[4]) {
    result = Math.pow(new_x, 2);
  } else if (easeType === tweenList[5]) {
    result = 1 - (1 - new_x) * (1 - new_x);
  } else if (easeType === tweenList[6]) {
    result =
      new_x < 0.5 ? 2 * new_x * new_x : 1 - Math.pow(-2 * new_x + 2, 2) / 2;
  } else if (easeType === tweenList[7]) {
    result = Math.pow(new_x, 3);
  } else if (easeType === tweenList[8]) {
    result = 1 - Math.pow(1 - new_x, 3);
  } else if (easeType === tweenList[9]) {
    result =
      new_x < 0.5
        ? 4 * new_x * new_x * new_x
        : 1 - Math.pow(-2 * new_x + 2, 3) / 2;
  } else if (easeType === tweenList[10]) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    result = c3 * new_x * new_x * new_x - c1 * new_x * new_x;
  } else if (easeType === tweenList[11]) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    result = 1 + c3 * Math.pow(new_x - 1, 3) + c1 * Math.pow(new_x - 1, 2);
  } else if (easeType === tweenList[12]) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    result =
      new_x < 0.5
        ? (Math.pow(2 * new_x, 2) * ((c2 + 1) * 2 * new_x - c2)) / 2
        : (Math.pow(2 * new_x - 2, 2) * ((c2 + 1) * (new_x * 2 - 2) + c2) + 2) /
          2;
  } else if (easeType === tweenList[13]) {
    const c4 = (2 * Math.PI) / 3;

    result =
      new_x === 0
        ? 0
        : new_x === 1
        ? 1
        : -Math.pow(2, 10 * new_x - 10) * Math.sin((new_x * 10 - 10.75) * c4);
  } else if (easeType === tweenList[14]) {
    const c4 = (2 * Math.PI) / 3;

    result =
      new_x === 0
        ? 0
        : new_x === 1
        ? 1
        : Math.pow(2, -10 * new_x) * Math.sin((new_x * 10 - 0.75) * c4) + 1;
  } else if (easeType === tweenList[15]) {
    const c5 = (2 * Math.PI) / 4.5;

    result =
      new_x === 0
        ? 0
        : new_x === 1
        ? 1
        : new_x < 0.5
        ? -(
            Math.pow(2, 20 * new_x - 10) * Math.sin((20 * new_x - 11.125) * c5)
          ) / 2
        : (Math.pow(2, -20 * new_x + 10) *
            Math.sin((20 * new_x - 11.125) * c5)) /
            2 +
          1;
  } else if (easeType === tweenList[16]) {
    result = easeOutBounce(new_x);
  } else if (easeType === tweenList[17]) {
    result = 1 - easeOutBounce(1 - new_x);
  } else if (easeType === tweenList[18]) {
    result =
      new_x < 0.5
        ? (1 - easeOutBounce(1 - 2 * new_x)) / 2
        : (1 + easeOutBounce(2 * new_x - 1)) / 2;
  } else {
    throw Error(`Unrecognised easeType: ${easeType}`);
  }
  return result * maximum;
};

export default tween;
