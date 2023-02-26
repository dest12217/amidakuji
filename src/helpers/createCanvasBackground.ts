import { inject, provide, ref } from "vue";
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

export const createCanvasBackground = (context: Maybe<CanvasRenderingContext2D>) => {
  const tiles = ref<Tile[]>([]);
  const interacts = ref<Interact[]>([]);

  /** 縦線描写 */
  for (let x = 2; x < (TILE_COUNT - 2); x = x + 2) {
    for (let y = 1; y < (TILE_COUNT - 1 - 1); y++) {
      tiles.value.push({ x, y });
    }
  }

  /** 横線描写 */
  let beforeY = 0;

  for (let x = 3; x < (TILE_COUNT - 3); x = x + 2) {
    let y = Math.floor(Math.random() * (16 - 3) + 3);

    // ひとつ前の座標と同じにならないようにする
    while (y === beforeY) {
      y = Math.floor(Math.random() * (16 - 3) + 3);
    }

    // インタラクションを設定する
    interacts.value.push(
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

    tiles.value.push({ x, y })
  }

  const interact = (targetTile: Tile): Maybe<Interact> => {
    const interact = interacts.value.find(({ tile }) => (tile.x === targetTile.x && tile.y === targetTile.y));

    if (typeof interact === 'undefined') {
      return createNothing();
    }

    return createJust(interact);
  };

  const draw = () => {
    if (isNothing(context)) {
      return;
    }

    context.value.fillStyle = '#efefef';
    context.value.fillRect(0, 0, 608, 608);
    tiles.value.forEach(({ x, y }) => fillCanvasTile(context.value, x, y, '#000'));
  };

  return {
    backgroundTiles: tiles.value,
    drawBackground: draw,
    interactBackground: interact,
  };
};
