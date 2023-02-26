<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { createCanvasBackground } from '../../helpers/createCanvasBackground';
import { fillCanvasTile } from '../../helpers/fillCanvasTile';
import { createJust, createNothing, isJust, isNothing, Maybe } from '../../utils/monado';
import { Interact, InteractAction } from "../../types";
import { createCanvasUser } from '../../helpers/createCanvasUser';
import { useInteractsProvide } from '../../providers/interactsProvide';

defineProps();

const canvasElement = ref<HTMLCanvasElement>();
const canvasContext = computed<Maybe<CanvasRenderingContext2D>>(() => {
  const context = canvasElement.value?.getContext('2d') ?? null;

  if (context === null) {
    return createNothing();
  }

  return createJust(context);
});

const interacts = useInteractsProvide();

const draw = () => {
  const { drawBackground } = createCanvasBackground(canvasContext.value);
  const { drawUser } = createCanvasUser(canvasContext.value, interacts);
  let interval = 0;
  let isFinished = false;

  interval = setInterval(() => {
    if (isNothing(canvasContext.value)) {
      clearInterval(interval);
      return;
    }

    const { value: context } = canvasContext.value;

    if (isFinished) {
      clearInterval(interval);
      return;
    }

    context.clearRect(0, 0, 608, 608);
    context.beginPath();

    drawBackground();
    isFinished = drawUser();

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
