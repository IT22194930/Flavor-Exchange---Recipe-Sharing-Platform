import React, { useState, Component } from 'react';
import { Button, Menu, MenuItem, IconButton, Tooltip, Snackbar } from '@mui/material';
import { TwitterIcon, FacebookIcon, LinkedinIcon, ShareIcon, LinkIcon } from 'lucide-react';
interface ShareButtonProps {
  title: string;
  description: string;
  url: string;
  variant?: 'icon' | 'button';
}
const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  description,
  url,
  variant = 'icon'
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShare = (platform: string) => {
    const shareText = `Check out this recipe: ${title}`;
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setShowCopiedMessage(true);
        handleClose();
        return;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };
  const shareOptions = [{
    platform: 'twitter',
    icon: <TwitterIcon size={18} />,
    label: 'Twitter'
  }, {
    platform: 'facebook',
    icon: <FacebookIcon size={18} />,
    label: 'Facebook'
  }, {
    platform: 'linkedin',
    icon: <LinkedinIcon size={18} />,
    label: 'LinkedIn'
  }, {
    platform: 'whatsapp',
    icon: <div size={18} />,
    label: 'WhatsApp'
  }, {
    platform: 'copy',
    icon: <LinkIcon size={18} />,
    label: 'Copy Link'
  }];
  return <>
      {variant === 'icon' ? <Tooltip title="Share">
          <IconButton onClick={handleClick}>
            <ShareIcon />
          </IconButton>
        </Tooltip> : <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleClick}>
          Share
        </Button>}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }} transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}>
        {shareOptions.map(option => <MenuItem key={option.platform} onClick={() => handleShare(option.platform)} sx={{
        gap: 1
      }}>
            {option.icon}
            {option.label}
          </MenuItem>)}
      </Menu>
      <Snackbar open={showCopiedMessage} autoHideDuration={2000} onClose={() => setShowCopiedMessage(false)} message="Link copied to clipboard" />
    </>;
};
export default ShareButton;