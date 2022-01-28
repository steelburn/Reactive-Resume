import { isFunction } from 'lodash';

const handleEnter = (event: React.KeyboardEvent<HTMLElement>, callback?: () => void): boolean => {
  if (event.key === 'Enter') {
    isFunction(callback) && callback();
    return true;
  }

  return false;
};

export default handleEnter;
