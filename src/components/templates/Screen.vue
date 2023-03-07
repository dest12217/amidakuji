<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCoreProvide } from '../../providers/coreProvide';

const canvasElement = ref<HTMLCanvasElement>();
const { setCanvasContext } = useCoreProvide();

onMounted(() => {
  setCanvasContext(canvasElement.value);
});
</script>

<template>
  <div class="screen">
    <canvas ref="canvasElement" width="608" height="608"></canvas>
  </div>
</template>

<style scoped>
  .screen {
    border: double #4432C3 5px;
  }
</style>
