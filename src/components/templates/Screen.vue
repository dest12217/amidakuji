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

console.log(interacts);


const draw = () => {
  const { drawBackground, interactBackground } = createCanvasBackground(canvasContext.value);
  const { drawUser } = createCanvasUser(canvasContext.value, 1);
  let x = 6;
  let y = 1;
  let interval = 0;
  let currentInteract: Maybe<Interact> = createNothing();

  interval = setInterval(() => {
    if (isNothing(canvasContext.value)) {
      clearInterval(interval);
      return;
    }

    const { value: context } = canvasContext.value;

    if (y > 16) {
      clearInterval(interval);
      return;
    }

    context.clearRect(0, 0, 608, 608);
    context.beginPath();

    drawBackground();
    // drawUser();
    fillCanvasTile(context, x, y, 'red');

    const interact = interactBackground({ x, y });

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

      context.closePath();

      return;
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

      context.closePath();

      return;
    }

    if (isJust(interact) && isJust(currentInteract)) {
      currentInteract = createNothing();
    }

    y++;

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
