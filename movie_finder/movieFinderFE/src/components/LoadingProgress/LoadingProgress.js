

import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
import './LoadingProgress.scss'

export default function LoadingProgress() {
  return (
    <div className="loading-progress">
      <CircularProgress />
    </div>
  );
}


