/**
 * @var タイルのサイズ（px）
 */
const TILE_SIZE = 32;

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
  y: number, style: string
): void => {
  context.fillStyle = style;
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
};
