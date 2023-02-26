import { inject, provide, readonly } from "vue";
import { User } from "../types";

const PROVIDE_KEY = 'core';

type CoreValue = {
  users: User[];
};

export function coreProvide() {
  provide<CoreValue>(PROVIDE_KEY, { users: [] });
}

export function useCoreProvide() {
  const core = inject<CoreValue>(PROVIDE_KEY);

  if (typeof core === 'undefined') {
    throw new ReferenceError();
  }

  const setCoreUsers = (...users: User[]) => ({
    ...core,
    users,
  })

  return {
    core: readonly(core),
    setCoreUsers,
  };
}
