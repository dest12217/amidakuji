import { inject, InjectionKey, provide, reactive, readonly } from "vue";
import { Interact, InteractAction, User } from "../types";
import { createJust, createNothing, Maybe } from "../utils/monado";

type ProvideValue = {
  value: readonly Interact[];
  setValue: (...values: Interact[]) => void;
};

const PROVIDE_KEY: InjectionKey<ProvideValue> = Symbol();

export const interactsProvideKey: InjectionKey<ProvideValue> = Symbol('interactsProvide');

export function useInteractsProvide(): Maybe<ProvideValue> {
  const value = inject(interactsProvideKey);

  if (typeof value === 'undefined') {
    return createNothing();
  }

  return createJust(value);
}


export function interactsProvide() {
  const interacts = reactive<Interact[]>([]);

  interacts.push({ tile: { x: 0, y: 0 }, action: InteractAction.Left });

  provide(interactsProvideKey, {
    value: readonly(interacts),
    setValue: (...values) => ([...interacts, ...values])
  });
}
