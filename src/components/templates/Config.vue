<script setup lang="ts">
import { ref } from 'vue';
import { User } from '../../types';

const createDefaultUser = () => ({
  name: '',
  avatarId: 0,
});

const users = ref<User[]>([createDefaultUser()]);
</script>

<template>
  <div class="config">
    <form>
      <label v-for="(user, index) in users" :key="index">
        <span>おなまえ{{ user.name }}</span>
        <input type="text" v-model="users[index].name">
        <input type="hidden" v-model="users[index].avatarId">
      </label>
      <button type="button" @click="() => users.push(createDefaultUser())">ついか</button>
    </form>
  </div>
</template>

<style scoped>
  .config {
  }
</style>
