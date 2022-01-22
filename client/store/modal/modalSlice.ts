import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalName =
  | 'auth.login'
  | 'auth.register'
  | 'auth.forgot'
  | 'auth.reset'
  | 'dashboard.create-resume'
  | 'dashboard.rename-resume';

export type ModalState<T = unknown> = {
  open: boolean;
  payload?: T;
};

type PayloadType = { modal: ModalName; state: ModalState; payload?: unknown };

const initialState: Record<ModalName, ModalState> = {
  'auth.login': { open: false },
  'auth.register': { open: false },
  'auth.forgot': { open: false },
  'auth.reset': { open: false },
  'dashboard.create-resume': { open: false },
  'dashboard.rename-resume': { open: false },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalState: (state: Record<ModalName, ModalState>, action: PayloadAction<PayloadType>) => {
      state[action.payload.modal] = action.payload.state;
    },
  },
});

export const { setModalState } = modalSlice.actions;

export default modalSlice.reducer;
