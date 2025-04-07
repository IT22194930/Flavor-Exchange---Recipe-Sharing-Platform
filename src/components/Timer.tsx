import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { PlayIcon, PauseIcon } from 'lucide-react';
interface TimerProps {
  initialMinutes: number;
}
const Timer: React.FC<TimerProps> = ({
  initialMinutes
}) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      // Play sound or show notification in a real app
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  const resetTimer = () => {
    setIsActive(false);
    setIsCompleted(false);
    setSeconds(initialMinutes * 60);
  };
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const progress = (initialMinutes * 60 - seconds) / (initialMinutes * 60) * 100;
  return <Box className="flex flex-col items-center py-4">
      <Box className="relative inline-flex items-center justify-center mb-4">
        <CircularProgress variant="determinate" value={progress} size={120} thickness={4} color={isCompleted ? 'success' : 'primary'} />
        <Box className="absolute flex items-center justify-center">
          <Typography variant="h4" component="div" color="textPrimary">
            {formatTime(seconds)}
          </Typography>
        </Box>
      </Box>
      {isCompleted ? <Typography variant="h6" color="success.main" className="mb-4">
          Time's up!
        </Typography> : <Typography variant="body2" color="textSecondary" className="mb-4">
          {isActive ? 'Timer running...' : 'Timer paused'}
        </Typography>}
      <Box className="flex space-x-2">
        <Button variant="contained" color={isActive ? 'secondary' : 'primary'} onClick={toggleTimer} startIcon={isActive ? <PauseIcon size={18} /> : <PlayIcon size={18} />} disabled={isCompleted}>
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outlined" onClick={resetTimer} startIcon={<div size={18} />}>
          Reset
        </Button>
      </Box>
    </Box>;
};
export default Timer;