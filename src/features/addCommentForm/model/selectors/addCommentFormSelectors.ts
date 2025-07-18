import { StateSchema } from 'app/providers/StoreProveder';

export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text;
export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
