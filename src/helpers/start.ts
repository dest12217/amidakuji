import { CoreValue } from "../providers/coreProvide";
import { User } from "../types";
import { isNothing } from "../utils/monado";
import { createCanvasBackground } from "./createCanvasBackground";
import { createCanvasUser } from "./createCanvasUser";

let interval = 0;

export const start = (core: CoreValue) => {
  clearInterval(interval);

  const { drawBackground, tiles } = createCanvasBackground(core);
  const canvasUsers = Array.from({ length: core.users.length }).map((_, index) => (
    createCanvasUser(core, index, (tiles.startX + (2 * index)))
  ))
  let isFinished = false;
  let wark = 0;
  let hitUser: User | null = null;

  interval = setInterval(() => {
    if (isNothing(core.canvasContext)) {
      clearInterval(interval);
      return;
    }

    const { value: context } = core.canvasContext;

    context.clearRect(0, 0, 608, 608);
    context.beginPath();

    drawBackground(wark);

    // 全てのユーザーの描画が完了している場合、完了フラグを立てる
    isFinished = canvasUsers.map(({ drawUser }) => drawUser()).every(({ isFinished, isHit }, index) => {
      if (isHit) {
        hitUser = core.users[index];
      }

      return isFinished;
    });

    if (isFinished) {
      context.fillStyle = '#4432C3';
      context.fillRect(184, 224, 240, 160);
      context.fillStyle = '#000';
      context.fillRect(186, 226, 236, 156);
      context.fillStyle = '#4432C3';
      context.fillRect(190, 230, 228, 148);
      context.fillStyle = '#000';
      context.fillRect(192, 232, 224, 144);
      context.fillStyle = '#fff';
      context.font = '20px \'Press Start 2P\', Arial, cursive';
      context.textAlign = 'center';
      context.fillText(hitUser?.name ?? '', 306, 320);
      clearInterval(interval);
    }

    context.closePath();
  }, 400);
};
