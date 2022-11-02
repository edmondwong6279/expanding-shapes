import styles from "./Polygon.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import Shape from "./shape";

const Polygon = () => {
  /*
	This component listens for a mouse down event in the canvas area outlined in blue.

	When it hears this event, a shape is instantiated with random parameters (size, colour,
	opacity, shape, duration, rotation). The shape starts off at scale 0 and enlarges for the
	initialised	duration.
	*/
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(700);
  const [dpr, setDpr] = useState(1);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  const [mouseClick, setMouseClick] = useState<number[]>([]); //coords when the mouse is clicked
  const shapesArray = useRef<Shape[]>([]); // array of instantiated shapes
  const time = useRef<number>(0);
  const raf = useRef<number>(0);

  const resizeListener = () => {
    if (canvas.current !== null) {
      setOffsetLeft(canvas.current.getBoundingClientRect().left);
      setOffsetTop(canvas.current.getBoundingClientRect().top);
    }
  };

  // initial set up
  useEffect(() => {
    if (canvas.current !== null) {
      canvas.current.width = width;
      canvas.current.height = height;
      setDpr(window.devicePixelRatio);
      setCtx(canvas.current.getContext("2d"));
      setOffsetLeft(canvas.current.getBoundingClientRect().left);
      setOffsetTop(canvas.current.getBoundingClientRect().top);
      const rect = canvas.current.getBoundingClientRect();
      canvas.current.width = rect.width * dpr;
      setWidth(rect.width * dpr);
      canvas.current.height = rect.height * dpr;
      setHeight(rect.height * dpr);
      // Scale the context (both) to ensure correct drawing operations
      canvas.current.style.width = `${rect.width}px`;
      canvas.current.style.height = `${rect.height}px`;
      window.addEventListener("resize", resizeListener);
    }
  }, [dpr, height, width]);

  // the callback used for the animation loop
  // overwrites the time ref to the new time, and renders each shape in the shapeArray
  const draw = useCallback(
    (currenttime: number) => {
      time.current = currenttime;
      if (ctx !== null && ctx !== undefined) {
        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        shapesArray.current.map((shape) => {
          const { start, paths, color, scale } = shape.draw(currenttime);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.translate(start[0], start[1]);
          ctx.beginPath();
          ctx.scale(scale as number, scale as number);
          paths.map((path: number[]) => {
            ctx.lineTo(path[0], path[1]);
          });
          ctx.fillStyle = color;
          ctx.fill();
        });
      }
      raf.current = window.requestAnimationFrame(draw);
    },
    [ctx, height, width]
  );

  useEffect(() => {
    if (ctx !== null && canvas.current !== null) {
      ctx.scale(dpr, dpr);
      // start the loop
      raf.current = window.requestAnimationFrame(draw);
    }
    return () => {
      window.cancelAnimationFrame(raf.current);
    };
  }, [ctx, dpr, draw]);

  // trigger when ctx is set up or when a mousedown occurs
  useEffect(() => {
    // this check stops an initial shape being rendered without a mousedown
    if (mouseClick.length !== 0) {
      shapesArray.current.push(
        new Shape(
          mouseClick[0] - offsetLeft,
          mouseClick[1] - offsetTop,
          time.current
        )
      );
    }
  }, [mouseClick, offsetLeft, offsetTop]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>↓↓↓Click the box below↓↓↓</h1>
      <canvas
        ref={canvas}
        className={styles.canvas}
        onMouseDown={(e) => {
          setMouseClick([e.clientX, e.clientY]);
        }}
      />
    </div>
  );
};

export default Polygon;
