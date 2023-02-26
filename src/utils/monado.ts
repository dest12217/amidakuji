enum Type {
  Just = '1',
  Nothing = '0',
};

type Just<T> = {
  type: Type.Just;
  value: T;
};

type Nothing = {
  type: Type.Nothing;
};

export type Maybe<T> = Just<T> | Nothing;

export const isJust = <T>(maybe: Maybe<T>): maybe is Just<T> => (maybe.type === Type.Just);

export const isNothing = (maybe: Maybe<unknown>): maybe is Nothing => (maybe.type === Type.Nothing);

export const createJust = <T>(value: T): Just<T> => ({
  type: Type.Just,
  value,
});

export const createNothing = (): Nothing => ({ type: Type.Nothing });

