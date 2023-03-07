import { reactive } from "vue";
import { CoreValue, TILE_COUNT } from "../providers/coreProvide";
import { InteractAction } from "../types";
import { isNothing } from "../utils/monado";
import { createRandomNumber } from "./createRandomNumber";
import { fillCanvasTile, mapTilePattern, TilePattern } from "./fillCanvasTile";

export const createCanvasBackground = (
  core: CoreValue,
) => {
  const { canvasContext, interacts, grids: { startX, startY, endX, goleX } } = core;
  const tiles = reactive<TilePattern[][]>([]);

  /** 縦線描写 */
  for (let x = startX; x < endX; x = x + 2) {
    tiles[x] = [];

    if (!tiles[x + 1]) {
      tiles[x + 1] = [];
    }

    if (!tiles[x - 1]) {
      tiles[x - 1] = [];
    }

    for (let y = startY; y < (TILE_COUNT - 1); y++) {
      tiles[x][y] = 'fill';
      tiles[x - 1][y] = x === startX ? 'borderRight' : 'borderBoth';
      tiles[x + 1][y] = x === (endX - 2) ? 'borderLeft': 'borderBoth';
    }
  }

  /** 横線描写 */
  let beforeY = 0;

  for (let x = (startX + 1); x < (endX - 1); x = x + 2) {
    let y = createRandomNumber(3, TILE_COUNT - 9);

    // ひとつ前の座標と同じにならないようにする
    while (y === beforeY) {
      y = createRandomNumber(3, TILE_COUNT - 9);
    }

    // インタラクションを設定する
    interacts.push(
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

    if (!tiles[x]) {
      tiles[x] = [];
    }
      tiles[x][y] = 'fill';
      tiles[x][y - 1] = 'fillDark';
      tiles[x][y + 1] = 'borderBothTop';
  }

  if (!tiles[goleX]) {
    tiles[goleX] = [];
  }

  tiles[goleX][TILE_COUNT - 3] = 'gole';

  const draw = (wark: number) => {
    if (isNothing(canvasContext)) {
      return;
    }

    canvasContext.value.fillStyle = '#000';
    canvasContext.value.fillRect(0, 0, 608, 608);

    tiles.forEach((row, x) => {
      row.forEach((pattern, y) => {
        fillCanvasTile(canvasContext.value, x, y, 'map', ...mapTilePattern[pattern]);
      });
    })
  };

  return {
    drawBackground: draw,
    tiles: { startX },
  };
};
