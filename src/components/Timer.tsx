import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

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

  const minuteHandRotation = (initialMinutes * 60 - seconds) / (initialMinutes * 60) * 360;

  return (
    <Box className="flex flex-col items-center" sx={{ width: '100%', maxWidth: '320px', margin: '0 auto' }}>
      <Box className="flex flex-col items-center p-6 bg-white rounded-lg w-full">
        {/* Clock face */}
        <Box className="relative w-48 h-48 mb-8">
          {/* Clock outline with shadow */}
          <Box className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]" />

          {/* Minute hand */}
          <Box 
            className="absolute w-[2px] h-[40%] bg-black"
            style={{ 
              top: '10%',
              left: '50%',
              transformOrigin: 'bottom center',
              transform: `translateX(-50%) rotate(${minuteHandRotation}deg)`,
              transition: 'transform 1s linear'
            }}
          />

          {/* Center dot */}
          <Box 
            className="absolute w-3 h-3 bg-black rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </Box>

        {/* Timer display */}
        <Typography variant="h2" className="mb-6 font-mono w-full text-center">
          {formatTime(seconds)}
        </Typography>

        <Typography variant="body1" color="text.secondary" className="mb-6 w-full text-center">
          {isCompleted ? "Time's up!" : isActive ? 'Timer running...' : 'Timer paused'}
        </Typography>

        <Box className="flex gap-4 w-full justify-center">
          <Button
            variant="contained"
            onClick={toggleTimer}
            disabled={isCompleted}
            startIcon={isActive ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
            sx={{
              backgroundColor: '#F26B4D',
              '&:hover': {
                backgroundColor: '#D85A3D'
              },
              borderRadius: '9999px',
              textTransform: 'none',
              px: 4,
              py: 1,
              minWidth: '120px'
            }}
          >
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant="outlined"
            onClick={resetTimer}
            sx={{
              color: '#F26B4D',
              borderColor: '#F26B4D',
              '&:hover': {
                borderColor: '#D85A3D',
                color: '#D85A3D'
              },
              borderRadius: '9999px',
              textTransform: 'none',
              minWidth: '120px'
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Timer;