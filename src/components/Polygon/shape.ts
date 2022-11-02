import tween from "./tween";
import { tweenList } from "./tween";
class Shape {
  numberOfSides: number;
  angle: number;
  color: string;
  radius: number;
  duration: number;
  size: number;
  startAngle: number;
  mousePos: number[];
  paths: number[][];
  scale: number;
  startTime: number;
  easeType: string;
  boundingBox: number[];

  constructor(mouseX: number, mouseY: number, time: number) {
    this.numberOfSides = Math.floor(Math.random() * 5 + 3);
    this.angle = (2 * Math.PI) / this.numberOfSides;
    this.color = this.generateColor();
    this.radius = 50;
    this.duration = Math.random() * 3 + 0.5;
    this.size = Math.random() * 10 + 10;
    this.startAngle = Math.random() * Math.PI;
    this.mousePos = [mouseX, mouseY];
    this.paths = [
      [
        this.radius * Math.cos(this.startAngle),
        this.radius * Math.sin(this.startAngle),
      ],
    ];
    this.startTime = time;
    this.easeType = tweenList[Math.floor(Math.random() * tweenList.length)];

    for (let i = 1; i <= this.numberOfSides; i++) {
      this.paths.push([
        this.radius * Math.cos(i * this.angle + this.startAngle),
        this.radius * Math.sin(i * this.angle + this.startAngle),
      ]);
    }

    this.boundingBox = this.getBoundingRect(this.paths);
    // reduce scale to be whatever (or just cap the max scale and randomly sample again)

    const width = 1000;
    const height = 700;

    let distFromEdgeX = 0;
    let distFromEdgeY = 0;
    let scaleX = 0;
    let scaleY = 0;

    if (mouseX > width / 2) {
      // right side
      distFromEdgeX = width - mouseX;
      scaleX = distFromEdgeX / this.boundingBox[1];
    } else {
      // left side
      distFromEdgeX = mouseX;
      scaleX = distFromEdgeX / -this.boundingBox[0];
    }

    if (mouseY > height / 2) {
      // bottom
      distFromEdgeY = height - mouseY;
      scaleY = distFromEdgeY / this.boundingBox[3];
    } else {
      // top
      distFromEdgeY = mouseY;
      scaleY = distFromEdgeY / -this.boundingBox[2];
    }

    this.scale = Math.random() * Math.min(scaleX, scaleY);
  }

  // BOUNDING BOXES
  // Go through the paths and find the min/max in x and y
  getBoundingRect = (path: number[][]) => {
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;

    for (let idx = 0; idx < path.length; idx++) {
      const [curr_x, curr_y] = path[idx];
      if (xMin > curr_x) xMin = curr_x;
      if (xMax < curr_x) xMax = curr_x;
      if (yMin > curr_y) yMin = curr_y;
      if (yMax < curr_y) yMax = curr_y;
    }

    return [xMin, xMax, yMin, yMax];
  };

  generateColor = () => {
    let finalHexString = "rgba(";
    for (let i = 0; i < 3; i++) {
      finalHexString += `${String(Math.floor(Math.random() * 256))},`;
    }
    finalHexString += String(Math.random());
    finalHexString += ")";
    return finalHexString;
  };

  // return an object with start, paths, color and scale (tweened).
  // do the tweening depending on the localTime (this will only change scale),
  // the other properties will remain the same.
  draw(nowTime: number) {
    return {
      start: this.mousePos,
      paths: this.paths,
      color: this.color,
      scale: tween(
        (nowTime - this.startTime) / 1000,
        this.duration,
        this.scale,
        this.easeType
      ),
    };
  }
}

export default Shape;
