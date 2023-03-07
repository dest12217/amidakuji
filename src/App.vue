<script setup lang="ts">
import Frame from './components/templates/Frame.vue'
</script>

<template>
  <div class="app">
    <Frame />
  </div>
</template>

<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    font: inherit;
  }

  html {
    background-color: #000;
    color: #fff;
  }

  canvas {
    vertical-align: bottom;
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  li {
    list-style: none;
  }
</style>

<style scoped>
  .app {
    display: flex;
    align-items: center;
    justify-content:  center;
    width: 100%;
    min-width: 1024px;
    height: 100vh;
  }
</style>
