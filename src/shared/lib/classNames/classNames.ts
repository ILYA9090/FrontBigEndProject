// Record это обьект с ограниченным количеством значений, в данном случае у нас ключ это стринг а значение это строка или булеан.
type Mods = Record<string, boolean | string>;

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
