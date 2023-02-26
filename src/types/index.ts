export type User = {
  name: string;
  avatarId: number;
};

export type Tile = {
  x: number;
  y: number;
};

export enum InteractAction {
  Left,
  Right,
};

export type Interact = {
  tile: Tile;
  action: InteractAction;
};
