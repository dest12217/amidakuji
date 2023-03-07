export type UserAvatar = {
  style: string;
  map: [number, number];
};
export type User = {
  name: string;
  avatar: UserAvatar;
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
