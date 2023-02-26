<script setup lang="ts">
import { defineComponent } from 'vue';
import { coreProvide } from '../../providers/coreProvide';
import { interactsProvide } from '../../providers/interactsProvide';
import Config from './Config.vue'
import Screen from './Screen.vue'
import Text from './Text.vue'

interactsProvide();
</script>

<template>
  <div class="frame">
    <Screen />
    <Config />
    <Text />
  </div>
</template>

<style scoped>
  .frame {
    width: 800px;
    height: 400px;
    margin: 0 auto;
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 200px;
    grid-template-rows: auto auto;
  }
</style>
