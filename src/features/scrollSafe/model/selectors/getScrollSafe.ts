import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProveder';

export const getScrollSafe = (state: StateSchema) => state.scrollSafe.scroll;
export const getScrollSafePath = createSelector(
  getScrollSafe,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0
);
