import { inject, InjectionKey, provide, reactive, readonly } from "vue";
import { Interact, InteractAction, Tile, User } from "../types";
import { createJust, createNothing, Maybe } from "../utils/monado";

export type InteractsProvideValue = {
  values: readonly Interact[];
  getValue: (targetTile: Tile) => Maybe<Interact>;
  setValue: (...values: Interact[]) => void;
};

const PROVIDE_KEY: InjectionKey<InteractsProvideValue> = Symbol();

export const interactsProvideKey: InjectionKey<InteractsProvideValue> = Symbol('interactsProvide');

export function useInteractsProvide(): Maybe<InteractsProvideValue> {
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
    values: readonly(interacts),
    getValue: (targetTile: Tile): Maybe<Interact> => {
      const currentInteract = interacts.find(({ tile }) => (tile.x === targetTile.x && tile.y === targetTile.y));

      if (typeof currentInteract === 'undefined') {
        return createNothing();
      }

      return createJust(currentInteract);
    },
    setValue: (...values) => {
      interacts.push(...values);
    },
  });
}
