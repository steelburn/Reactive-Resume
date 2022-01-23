import { Resume } from '@reactive-resume/schema';
import { debounce } from 'lodash';
import { select, takeLatest } from 'redux-saga/effects';

import { updateResume } from '@/services/resume';

import { setResumeState } from '../resume/resumeSlice';

const DEBOUNCE_WAIT = 2500;

const debouncedSync = debounce((resume: Resume) => updateResume(resume), DEBOUNCE_WAIT);

function* handleSync() {
  const resume: Resume = yield select((state) => state.resume);

  debouncedSync(resume);
}

function* syncSaga() {
  yield takeLatest(setResumeState, handleSync);
}

export default syncSaga;
