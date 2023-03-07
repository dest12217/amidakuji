<script setup lang="ts">
import { start } from '../../helpers/start';
import { useCoreProvide } from '../../providers/coreProvide';
import { UserAvatar } from '../../types';
import ImageCharacter from '../../assets/images/character.png';

const userAvatarSrc = `url(${ImageCharacter})`;

const avatarClasses: UserAvatar[] = [
  {
    style: '-char-01',
    map: [0, 0],
  },
  {
    style: '-char-02',
    map: [3, 0],
  },
  {
    style: '-char-03',
    map: [2, 0],
  },
  {
    style: '-char-04',
    map: [1, 0],
  },
];
const { core, clearInteracts, setUser, deleteUser, setGrids, setUsersWithLocalStorage, loadUsersWithLocalStorage } = useCoreProvide();

const getAvaterClass = (): UserAvatar => (
  avatarClasses[Math.floor(Math.random() * avatarClasses.length)]
);

const createDefaultUser = () => ({
  name: '',
  avatar: getAvaterClass(),
});

loadUsersWithLocalStorage();

if (core.users.length === 0) {
  setUser(createDefaultUser(), 0);
  setUser(createDefaultUser(), 1);
  setUser(createDefaultUser(), 2);
  setUser(createDefaultUser(), 3);
  setUser(createDefaultUser(), 4);
}

const onSubmit = (event: Event) => {
  event.preventDefault();
  clearInteracts();
  setGrids();
  setUsersWithLocalStorage();
  start(core);
};

const onClickUserAdd = () => setUser(createDefaultUser());

const onClickUserDelete = () => deleteUser();
</script>

<template>
  <div class="config">
    <form @submit="onSubmit">
      <div
        v-for="(user, index) in core.users" :key="index"
        class="user"
      >
        <button
          type="button"
          :class="{
            ['user-avatar']: true,
            [user.avatar.style]: true
          }"
          @click="() => {
            setUser({
              ...user,
              avatar: getAvaterClass()
            }, index)
          }"
        ></button>
        <label class="user-name">
          <input type="text" v-model="core.users[index].name" title="おなまえ" maxlength="16" required>
        </label>
      </div>
      <ul>
        <li>
          <button
            class="button"
            type="button"
            @click="onClickUserAdd"
          >ADD</button>
        </li>
        <li>
          <button
            class="button"
            type="button"
            @click="onClickUserDelete"
          >DELETE</button>
        </li>
        <li>
          <button class="button">GO</button>
        </li>
      </ul>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .config {
    font-family: 'Press Start 2P', Arial, cursive;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 4px;
    border-bottom: solid 1px #4432C3;

    &:focus-within {
      border-color: #f2a98d;
    }
  }

  .user-avatar {
    background-image: v-bind(userAvatarSrc);
    background-size: 128px auto;
    background-color: transparent;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border: 0;
    position: relative;

    &:hover,
    &:focus,
    &:active {
      top: -8px;
    }

    &.-char-01 {
      background-position: 0 0;
    }

    &.-char-02 {
      background-position: 32px 0;
    }

    &.-char-03 {
      background-position: 64px 0;
    }

    &.-char-04 {
      background-position: 96px 0;
    }
  }

  .user-name {
    flex-grow: 1;
    > input {
      background: none;
      border: 0;
      height: 32px;
      outline: 0;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      width: 100%;
    }
  }

  .button {
    font-size: 18px;
    color: #fff;
    background: none;
    border: 0;
    padding: 8px;

    &:hover,
    &:focus,
    &:active {
      color: #f2a98d;
    }
  }
</style>
