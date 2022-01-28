import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SidebarState = {
  open: boolean;
};

type BuildState = {
  leftSidebar: SidebarState;
  rightSidebar: SidebarState;
};

type SidebarStatePayload = {
  sidebar: 'left' | 'right';
  state: SidebarState;
};

const initialState: BuildState = {
  leftSidebar: { open: false },
  rightSidebar: { open: false },
};

export const buildSlice = createSlice({
  name: 'build',
  initialState,
  reducers: {
    setSidebarState: (state, action: PayloadAction<SidebarStatePayload>) => {
      const { sidebar, state: newState } = action.payload;

      sidebar === 'left'
        ? (state.leftSidebar = { ...state, ...newState })
        : (state.rightSidebar = { ...state, ...newState });
    },
  },
});

export const { setSidebarState } = buildSlice.actions;

export default buildSlice.reducer;
