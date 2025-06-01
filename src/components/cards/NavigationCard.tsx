import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { memo } from 'react';
import { skillCardStyles as STYLES } from '@/styles/cards/SkillCard.styles';

interface NavigationCardProps {
  sections: {
    id: string;
    title: string;
    icon: React.ReactNode;
  }[];
  activeSection?: string;
}

function NavigationCard({ sections, activeSection }: NavigationCardProps) {
  return (
    <Card
      sx={{
        ...STYLES.CARD,
        position: 'fixed',
        left: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 48,
        height: 'fit-content',
        zIndex: 1000,
      }}
    >
      <CardContent sx={{ p: '0 !important' }}>
        <List sx={{ width: '100%', py: 0 }}>
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <ListItem key={section.id} disablePadding sx={{ mb: 0.5, '&:last-child': { mb: 0 } }}>
                <ListItemButton
                  component="a"
                  href={`#${section.id}`}
                  disableRipple
                  disableTouchRipple
                  sx={{
                    borderRadius: 1,
                    minWidth: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                      backgroundColor: 'transparent !important',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    {section.icon && typeof section.icon === 'object'
                      ? (
                          // react-icons ikonları React element olduğu için style ile geçiyoruz
                          // @ts-ignore
                          section.icon.type
                            ? (
                                <section.icon.type {...section.icon.props} style={{ color: isActive ? '#1976d2' : undefined, fontSize: isActive ? 28 : 22, fontWeight: 400, transition: 'color 0.2s, font-size 0.2s' }} />
                              )
                            : section.icon
                        )
                      : section.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

export default memo(NavigationCard); 