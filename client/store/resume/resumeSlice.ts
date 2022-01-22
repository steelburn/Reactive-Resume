import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { set } from 'lodash';

import { Resume } from '@/models/Resume';

type ResumeState = Resume;

type PayloadType = { path: string; value: string };

const initialState: ResumeState = {} as Resume;

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResume: (_state: ResumeState, action: PayloadAction<ResumeState>) => action.payload,
    setResumeState: (state: ResumeState, action: PayloadAction<PayloadType>) => {
      const { path, value } = action.payload;

      set(state, path, value);
    },
  },
});

export const { setResume, setResumeState } = resumeSlice.actions;

export default resumeSlice.reducer;
