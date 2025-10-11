import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import PeopleIcon from '@mui/icons-material/People';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface SideNavProps {
    open: boolean;
    onClose: () => void;
}

interface MenuItem {
    text: string;
    icon: React.ReactElement,
    path: string;
}


export const SideNav: React.FC<SideNavProps> = ({ open, onClose }) => {
  
    const drawerWidth = 260;
  
    const menuItem: MenuItem[] = [
        {
            text: 'Carreras Técnicas',
            icon: <SchoolIcon/>,
            path: '/carreras'
        },
        {
            text: 'Usuarios',
            icon: <PeopleIcon/>,
            path: '/usuarios'
        }
    ]

    const handleItemClick = (path: string) => {
        onClose();
    }
  
    return (
        <Drawer anchor='left' open={open} onClose={onClose} ModalProps={{ keepMounted: true }} sx={{'& .MuiDrawer-paper': {top: '64px', height: 'calc(100% - 64px)'}}}>
            <List sx={{ width: drawerWidth }}>
                {
                    menuItem.map((item,index) => (
                        <ListItemButton key={index} onClick={() => handleItemClick(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}></ListItemText>
                        </ListItemButton>
                    ))
                }
            </List>
        </Drawer>
  )
}
