<script setup lang="ts">
import { coreProvide } from '../../providers/coreProvide';
import Config from './Config.vue'
import Screen from './Screen.vue'

coreProvide();
</script>

<template>
  <div class="frame">
    <Screen />
    <Config />
  </div>
</template>

<style scoped>
  .frame {
    width: 900px;
    margin: 0 auto;
    display: flex;
    gap: 16px;
  }
</style>
