import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CalendarMonth, PermContactCalendar } from '@mui/icons-material';

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

    const navigate = useNavigate();

    const drawerWidth = 260;

    const menuItem: MenuItem[] = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon/>,
            path: '/dashboard'
        },
        {
            text: 'Carreras Técnicas',
            icon: <SchoolIcon/>,
            path: '/carreras'
        },
        {
            text: 'Usuarios',
            icon: <PeopleIcon/>,
            path: '/users'
        },
        {
            text: 'Roles',
            icon: <SecurityIcon/>,
            path: '/usuarios'
        },
        {
            text: 'Examenes Admisión',
            icon: <CalendarMonthIcon/>,
            path: '/examenes-admision'
        },
        {
            text: 'Resultado examen admision',
            icon: <PermContactCalendar/>,
            path: '/status-examen-admision'
        }
    ]

    const handleItemClick = (path: string) => {
        navigate(path);
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