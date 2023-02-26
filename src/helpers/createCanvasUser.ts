import { inject } from "vue";
import { InteractsProvideValue } from "../providers/interactsProvide";
import { Interact, InteractAction } from "../types";
import { createNothing, isJust, isNothing, Maybe } from "../utils/monado";
import { fillCanvasTile } from "./fillCanvasTile";

export const createCanvasUser = (
  context: Maybe<CanvasRenderingContext2D>,
  interacts: Maybe<InteractsProvideValue>,
) => {
  let x = 2;
  let y = 1;
  let currentInteract: Maybe<Interact> = createNothing();

  const draw = () => {
    if (isNothing(interacts) || isNothing(context)) {
      throw new ReferenceError();
    }

    fillCanvasTile(context.value, x, y, 'red');

    const interact = interacts.value.getValue({ x, y });
    let isFinished = (y > 16);

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
