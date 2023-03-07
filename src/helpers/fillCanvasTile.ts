import ImageMap from '../assets/images/map.png';
import ImageCharacter from '../assets/images/character.png';

/**
 * @var タイルのサイズ（px）
 */
const TILE_SIZE = 32;

const createImage = (src: string) => {
  const image = new Image(TILE_SIZE, TILE_SIZE);

  image.src = src;

  return image;
};

const tilePatterns = {
  map: createImage(ImageMap),
  character: createImage(ImageCharacter),
} as const;

export const mapTilePattern: Record<string, [number, number]> = {
  fill: [1, 1],
  fillDark: [3, 3],
  borderBoth: [3, 0],
  borderBothTop: [3, 2],
  borderLeft: [2, 1],
  borderRight: [0, 1],
  borderTop: [1, 0],
  borderTopLeft: [0, 0],
  borderTopRight: [2, 0],
  borderBottom: [1, 2],
  borderBottomLeft: [0, 2],
  borderBottomRight: [2, 2],
  gole: [0, 2],
};

export type TilePattern = keyof typeof mapTilePattern;

/**
 * 該当する座標のタイルを塗りつぶす
 *
 * @param context キャンバス
 * @param x X座標
 * @param y Y座標
 * @param style 塗りつぶしのスタイル
 */
export const fillCanvasTile = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  tileKey: keyof typeof tilePatterns,
  tileX: number,
  tileY: number
): void => {
  context.drawImage(tilePatterns[tileKey], (TILE_SIZE * tileX), (TILE_SIZE * tileY), TILE_SIZE, TILE_SIZE, (TILE_SIZE * x), (TILE_SIZE * y), TILE_SIZE, TILE_SIZE);
};
