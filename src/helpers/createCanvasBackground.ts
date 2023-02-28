import { inject, provide, reactive, ref } from "vue";
import { interactsProvideKey, useInteractsProvide } from "../providers/interactsProvide";
import { Interact, InteractAction, Tile } from "../types";
import { createJust, createNothing, isNothing, Maybe } from "../utils/monado";
import { fillCanvasTile } from "./fillCanvasTile";

/**
 * @var 1レーンに置けるタイルの数
 */
const TILE_COUNT = 20;

export const useCanvasBackground = () => ({
  backgroundInteracts: inject<Interact[]>('backgroundInteracts', [])
});

export const createCanvasBackground = (
  context: Maybe<CanvasRenderingContext2D>,
  userTotal: number
) => {
  const tiles = reactive<Tile[]>([]);
  const interacts = useInteractsProvide();
  const startX = Math.floor((TILE_COUNT - (userTotal * 2)) / 2);
  const startY = 1;
  const endY = 1;

  if (isNothing(interacts)) {
    throw new ReferenceError();
  }

  console.log(startX + (userTotal * 2));

  /** 縦線描写 */
  for (let x = startX; x < (startX + (userTotal * 2)); x = x + 2) {
    for (let y = startY; y < (TILE_COUNT - startY - endY); y++) {
      tiles.push({ x, y });
    }
  }

  /** 横線描写 */
  let beforeY = 0;

  for (let x = (startX + 1); x < (startX + (userTotal * 2) - 1); x = x + 2) {
    let y = Math.floor(Math.random() * (16 - 3) + 3);

    // ひとつ前の座標と同じにならないようにする
    while (y === beforeY) {
      y = Math.floor(Math.random() * (16 - 3) + 3);
    }

    // インタラクションを設定する
    interacts.value.setValue(
      {
        tile: {
          x: x + 1,
          y,
        },
        action: InteractAction.Left,
      },
      {
        tile: {
          x: x - 1,
          y,
        },
        action: InteractAction.Right,
      }
    );

    beforeY = y;

    tiles.push({ x, y })
  }

  const draw = () => {
    if (isNothing(context)) {
      return;
    }

    context.value.fillStyle = '#efefef';
    context.value.fillRect(0, 0, 608, 608);
    tiles.forEach(({ x, y }) => fillCanvasTile(context.value, x, y, '#000'));
  };

  return {
    backgroundTiles: tiles,
    drawBackground: draw,
    tiles: { startX },
  };
};
