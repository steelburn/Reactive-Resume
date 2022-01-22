import clsx from 'clsx';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import styles from '@/styles/components/build/Center.module.scss';

import Artboard from './Artboard';
import Header from './Header';
import PageController from './PageController';

const Center = () => {
  return (
    <div className={clsx(styles.center)}>
      <Header />

      <TransformWrapper
        centerOnInit
        limitToBounds={false}
        centerZoomedOut={false}
        minScale={0.5}
        initialScale={0.95}
        pinch={{ step: 1 }}
        wheel={{ step: 0.1 }}
      >
        {(controllerProps) => (
          <>
            <TransformComponent wrapperClass={styles.wrapper}>
              <Artboard />
            </TransformComponent>

            <PageController {...controllerProps} />
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Center;
