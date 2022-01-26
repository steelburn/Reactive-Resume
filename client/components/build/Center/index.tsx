import clsx from 'clsx';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import Artboard from './Artboard';
import styles from './Center.module.scss';
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
