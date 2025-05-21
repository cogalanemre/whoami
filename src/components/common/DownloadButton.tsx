import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import { memo, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { DOWNLOAD_BUTTON_STYLES } from '@/styles/common/DownloadButton.styles';

function DownloadButton() {
  const { t } = useTranslation();
  const { cvFiles } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (fileName: string) => {
    const link = document.createElement('a');
    link.href = `/cv/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        startIcon={<FaDownload />}
        sx={DOWNLOAD_BUTTON_STYLES.BUTTON}
      >
        {t('hero.downloadCV')}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: DOWNLOAD_BUTTON_STYLES.MENU
        }}
      >
        {cvFiles.map((cv) => (
          <MenuItem
            key={cv.file}
            onClick={() => handleDownload(cv.file)}
            sx={DOWNLOAD_BUTTON_STYLES.MENU_ITEM}
          >
            <ListItemIcon>
              <FaFilePdf />
            </ListItemIcon>
            <ListItemText primary={cv.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default memo(DownloadButton); 