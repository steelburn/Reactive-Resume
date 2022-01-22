import {
  FilterCenterFocus as FilterCenterFocusIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from '@mui/icons-material';
import { ButtonBase, Tooltip } from '@mui/material';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

import styles from '@/styles/components/build/PageController.module.scss';

const PageController: React.FC<ReactZoomPanPinchRef> = ({ zoomIn, zoomOut, centerView }) => {
  return (
    <div className={styles.container}>
      <div className={styles.controller}>
        <Tooltip arrow placement="top" title="Zoom In">
          <ButtonBase onClick={() => zoomIn(0.25)}>
            <ZoomInIcon fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title="Zoom Out">
          <ButtonBase onClick={() => zoomOut(0.25)}>
            <ZoomOutIcon fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title="Center Page">
          <ButtonBase onClick={() => centerView(0.95)}>
            <FilterCenterFocusIcon fontSize="medium" />
          </ButtonBase>
        </Tooltip>
      </div>
    </div>
  );
};

export default PageController;
