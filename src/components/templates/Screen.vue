<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { createCanvasBackground } from '../../helpers/createCanvasBackground';
import { createJust, createNothing, isNothing, Maybe } from '../../utils/monado';
import { createCanvasUser } from '../../helpers/createCanvasUser';

defineProps();

const canvasElement = ref<HTMLCanvasElement>();
const canvasContext = computed<Maybe<CanvasRenderingContext2D>>(() => {
  const context = canvasElement.value?.getContext('2d') ?? null;

  if (context === null) {
    return createNothing();
  }

  return createJust(context);
});

const userTotal = 5;

const draw = () => {
  const { drawBackground, tiles } = createCanvasBackground(canvasContext.value, userTotal);
  const users = Array.from({ length: userTotal }).map((_, index) => (
    createCanvasUser(canvasContext.value, (tiles.startX +  (2 * index)))
  ))
  let interval = 0;
  let isFinished = false;

  interval = setInterval(() => {
    if (isFinished || isNothing(canvasContext.value)) {
      clearInterval(interval);
      return;
    }

    const { value: context } = canvasContext.value;

    context.clearRect(0, 0, 608, 608);
    context.beginPath();

    drawBackground();

    // 全てのユーザーの描画が完了している場合、完了フラグを立てる
    isFinished = users.map(({ drawUser }) => drawUser()).every((result) => result);

    context.closePath();
  }, 200);
};

onMounted(() => {
  draw();
});
</script>

<template>
  <div class="screen">
    <canvas ref="canvasElement" width="608" height="608"></canvas>
  </div>
</template>

<style scoped>
  .screen {
  }
</style>
