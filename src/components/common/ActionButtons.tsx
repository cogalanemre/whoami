import { Box, IconButton } from '@mui/material';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { memo } from 'react';
import { ACTION_BUTTONS_STYLES } from '@/styles/common/actionButtons.styles';

interface ActionButtonsProps {
  githubUrl?: string;
  liveUrl?: string;
}

function ActionButtons({ githubUrl, liveUrl }: ActionButtonsProps) {
  return (
    <Box sx={ACTION_BUTTONS_STYLES.CONTAINER}>
      {githubUrl && (
        <IconButton
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
          sx={ACTION_BUTTONS_STYLES.BUTTON}
        >
          <FaGithub />
        </IconButton>
      )}
      {liveUrl && (
        <IconButton
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Live Demo"
          sx={ACTION_BUTTONS_STYLES.BUTTON}
        >
          <FaExternalLinkAlt />
        </IconButton>
      )}
    </Box>
  );
}

export default memo(ActionButtons); 