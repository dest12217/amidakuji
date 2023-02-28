import { InteractsProvideValue, useInteractsProvide } from "../providers/interactsProvide";
import { Interact, InteractAction } from "../types";
import { createNothing, isJust, isNothing, Maybe } from "../utils/monado";
import { fillCanvasTile } from "./fillCanvasTile";

export const createCanvasUser = (
  context: Maybe<CanvasRenderingContext2D>,
  position: number,
) => {
  let x = position;
  let y = 1;
  let currentInteract: Maybe<Interact> = createNothing();
  const interacts = useInteractsProvide();

  // console.log(r);

  const draw = () => {
    if (isNothing(interacts) || isNothing(context)) {
      throw new ReferenceError();
    }

    fillCanvasTile(context.value, x, y, 'red');

    let isFinished = (y >= 16);

    if (isFinished) {
      return isFinished;
    }


    const interact = interacts.value.getValue({ x, y });

    if (isJust(interact) && isNothing(currentInteract)) {
      currentInteract = interact;

      switch (currentInteract.value.action) {
        case InteractAction.Left:
          x--;
          break;
        case InteractAction.Right:
          x++;
          break;
      }

      return isFinished;
    }

    if (isNothing(interact) && isJust(currentInteract)) {
      switch (currentInteract.value.action) {
        case InteractAction.Left:
          x--;
          break;
        case InteractAction.Right:
          x++;
          break;
      }

      return isFinished;
    }

    if (isJust(interact) && isJust(currentInteract)) {
      currentInteract = createNothing();
    }

    y++;
    isFinished = (y > 16);

    return isFinished;
  }

  return {
    drawUser: draw,
  };
};
