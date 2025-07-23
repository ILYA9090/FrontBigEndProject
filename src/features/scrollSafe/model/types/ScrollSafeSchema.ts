// <Адрес страницы, позиция скрола>

export type ScrollSchema = Record<string, number>;

export interface ScrollSafeSchema {
  scroll: ScrollSchema;
}
