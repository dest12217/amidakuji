import { inject, provide, reactive, readonly } from "vue";
import { createRandomNumber } from "../helpers/createRandomNumber";
import { Interact, Tile, User } from "../types";
import { createJust, createNothing, isNothing, Maybe } from "../utils/monado";

/**
 * @var 1レーンに置けるタイルの数
 */
export const TILE_COUNT = 20;

const PROVIDE_KEY = 'core';

export type CoreValue = {
  users: User[];
  canvasContext: Maybe<CanvasRenderingContext2D>;
  interacts: Interact[];
  grids: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    goleX: number;
  };
};


export const useCoreProvide = () => {
  const core = inject<CoreValue>(PROVIDE_KEY);

  if (typeof core === 'undefined') {
    throw new ReferenceError();
  }

  const setUser = (user: User, index?: number) => {
    if (typeof index === 'undefined') {
      core.users.push(user);
    } else {
      core.users.splice(index, 1, user);
    }
  };

  const deleteUser = () => {
    core.users.pop();
  };

  const setCanvasContext = (canvasElement?: HTMLCanvasElement) => {
    const canvasContext = canvasElement?.getContext('2d') ?? null;

    core.canvasContext = (canvasContext === null) ? createNothing() : createJust(canvasContext);
  };

  const getInteract = (targetTile: Tile): Maybe<Interact> => {
    const currentInteract = core.interacts.find(({ tile }) => (tile.x === targetTile.x && tile.y === targetTile.y));

    if (typeof currentInteract === 'undefined') {
      return createNothing();
    }

    return createJust(currentInteract);
  };

  const clearInteracts = () => {
    core.interacts.splice(0);
  };

  const setGrids = () => {
    const startX = Math.floor((TILE_COUNT - (core.users.length * 2)) / 2);
    const startY = 0;
    const endX = core.users.length * 2 + startX;
    const endY = TILE_COUNT - 6;
    let goleX = createRandomNumber(startX, endX - 2);

    while (
      (startX % 2 === 0) && (goleX % 2 !== 0) ||
      (startX % 2 !== 0) && (goleX % 2 === 0)
    ) {
      goleX = createRandomNumber(startX, endX - 2);
    }

    core.grids.startX = startX;
    core.grids.startY = startY;
    core.grids.endX = endX;
    core.grids.endY = endY;
    core.grids.goleX = goleX;
  }

  const setUsersWithLocalStorage = () => {
    localStorage.setItem('AMIDAKUJI_USERS', JSON.stringify(core.users));
  };

  const loadUsersWithLocalStorage = () => {
    core.users = JSON.parse(localStorage.getItem('AMIDAKUJI_USERS') ?? '[]');
  };

  return {
    core,
    clearInteracts,
    setUser,
    deleteUser,
    setCanvasContext,
    getInteract,
    setGrids,
    setUsersWithLocalStorage,
    loadUsersWithLocalStorage,
  };
};

export const coreProvide = () => {
  const core = reactive({
    users: [],
    canvasContext: createNothing(),
    interacts: [],
    grids: {
      startX: NaN,
      startY: NaN,
      endX: NaN,
      endY: NaN,
      goleX: NaN,
    },
  });

  provide<CoreValue>(PROVIDE_KEY, core);
}
