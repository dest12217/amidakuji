import { inject } from "vue";
import { interactsProvideKey } from "../providers/interactsProvide";
import { isNothing, Maybe } from "../utils/monado";
import { useCanvasBackground } from "./createCanvasBackground";
import { fillCanvasTile } from "./fillCanvasTile";

export const createCanvasUser = (
  context: Maybe<CanvasRenderingContext2D>,
  position: number
) => {
  const draw = () => {
    if (isNothing(context)) {
      return;
    }

    let x = 2 * position;
    let y = 1;

    fillCanvasTile(context.value, x, y, 'red');

  }

  return {
    drawUser: draw,
  };
};
