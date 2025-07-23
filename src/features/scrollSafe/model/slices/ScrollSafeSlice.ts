import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSafeSchema } from '../types/ScrollSafeSchema';

const initialState: ScrollSafeSchema = {
  scroll: {},
};

export const ScrollSafeSlice = createSlice({
  name: 'ScrollSafeSlice',
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      action: PayloadAction<{ path: string; position: number }>
    ) => {
      state.scroll[action.payload.path] = action.payload.position;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: ScrollSafeActions } = ScrollSafeSlice;
export const { reducer: ScrollSafeReducer } = ScrollSafeSlice;
