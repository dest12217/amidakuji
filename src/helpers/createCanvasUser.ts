import { CoreValue } from "../providers/coreProvide";
import { Interact, InteractAction, Tile } from "../types";
import { createJust, createNothing, isJust, isNothing, Maybe } from "../utils/monado";
import { fillCanvasTile } from "./fillCanvasTile";

export const createCanvasUser = (
  core: CoreValue,
  userIndex: number,
  position: number,
) => {
  const { users, canvasContext, interacts, grids: { goleX } } = core;
  const user = users[userIndex];
  let x = position;
  let y = 1;
  let currentInteract: Maybe<Interact> = createNothing();

  const getInteract = (targetTile: Tile): Maybe<Interact> => {
    const currentInteract = interacts.find(({ tile }) => (tile.x === targetTile.x && tile.y === targetTile.y));

    if (typeof currentInteract === 'undefined') {
      return createNothing();
    }

    return createJust(currentInteract);
  };

  const draw = () => {
    if (isNothing(canvasContext)) {
      throw new ReferenceError();
    }

    fillCanvasTile(canvasContext.value, x, y, 'character', ...user.avatar.map);

    let isFinished = (y >= 16);

    if (isFinished) {
      return {
        isFinished,
        isHit: (x === goleX),
      };
    }

    const interact = getInteract({ x, y });

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

      return {
        isFinished,
        isHit: (x === goleX),
      };
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

      return {
        isFinished,
        isHit: (x === goleX),
      };
    }

    if (isJust(interact) && isJust(currentInteract)) {
      currentInteract = createNothing();
    }

    y++;
    isFinished = (y > 16);

    return {
      isFinished,
      isHit: (x === goleX),
    };
  }

  return {
    drawUser: draw,
  };
};
