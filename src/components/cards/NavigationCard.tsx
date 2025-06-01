import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { memo, cloneElement, isValidElement } from 'react';
import { useTheme } from '@mui/material';
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
  const theme = useTheme();
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
                    {isValidElement(section.icon)
                      ? cloneElement(section.icon, {
                          style: {
                            color: isActive ? theme.palette.primary.main : theme.palette.divider,
                            fontSize: isActive ? 28 : 18,
                            fontWeight: 400,
                            filter: 'none',
                            boxShadow: 'none',
                            transition: 'color 0.2s, font-size 0.2s',
                          },
                        })
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