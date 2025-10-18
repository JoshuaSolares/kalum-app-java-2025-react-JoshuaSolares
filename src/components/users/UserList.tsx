import React, { use, useEffect, useState } from 'react'
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Box,
    CircularProgress,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    InputAdornment
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import Edition from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Visibility, VisibilityOff} from '@mui/icons-material';

import Swal from 'sweetalert2';

interface User {
    userId: string;
    username: string;
    email: string;
    passwordHash: string;
    identityUser: string;
    createdAt: string;
}



export const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formUsername, setFormUsername] = useState<string>('');
    const [formEmail, setFormEmail] = useState<string>('');
    const [formPassword, setFormPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const fethUsers = () => {
        setTimeout(() => {
            const data = [
                {
                    userId: '1',
                    username: 'Edwin Tumax',
                    email: 'edwintumax@gmail.com',
                    passwordHash: '445fadsfdasxxtghh',
                    identityUser: '0',
                    createdAt: '2025-10-15T02:45:34'
                },
                {
                    userId: '2',
                    username: 'Nancy Tumax',
                    email: 'nancytumax@gmail.com',
                    passwordHash: '445fadsfdasxxtghh',
                    identityUser: '1',
                    createdAt: '2025-11-15T02:45:34'
                }
            ];
            setUsers(data);
            setLoading(false);
        }, 3000);
    }


    useEffect(() => {
        fethUsers();
    });

    const handleToggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }


    const handleOpenModal = (user?: User) => {
    if (user) {
            setSelectedUser(user);
            setFormUsername(user.username);
        } else {
            setSelectedUser(null);
            setFormUsername('');
        }
        setModalOpen(true);
    }

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Esta seguro de eliminar el registro?",
            text: "Los cambios no serán reversibles!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Eliminado",
                    text: "El registro fue eliminado correctamente",
                    icon: "success"
                });
            }
        });
    }

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
        setFormUsername('');
    }

    const handleSave = () => {
        handleCloseModal();
        Swal.fire({
            title: 'Usuarios',
            text: 'El registro fue almacenado correctamente.',
            icon: 'success'
        }).then((result) => {
            if (result.isConfirmed) {
                handleCloseModal();
            }
        });
    }

    const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant='h4' gutterBottom>Usuarios</Typography>
            <Button variant='contained' startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => handleOpenModal()}>
                Agregar Usuario
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>USERNAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>IDENTITY</TableCell>
                            <TableCell>CREATED AT</TableCell>
                            <TableCell align='right'>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map(((user) => (
                            <TableRow key={user.userId}>
                                <TableCell>{user.userId}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.identityUser}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => { handleOpenModal(user) }} color='primary'>
                                        <Edition />
                                    </IconButton>
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton color='error' onClick={() => { handleDelete(user.userId) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )))}
                        {paginatedUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align='center'>
                                    No hay Usuarios disponibles
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination component="div" count={users.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPageOptions={[5, 10, 20]} />
            </TableContainer>
            <Dialog open={modalOpen} fullWidth maxWidth="sm" onClose={handleCloseModal}>
                <DialogTitle>{selectedUser ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
                <DialogContent>
                    <TextField label="Username" fullWidth margin='normal' value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
                    <TextField label="Email" type='email' fullWidth margin='normal' value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
                    <TextField label="Password" type={ showPassword ? 'text' : 'password'} fullWidth margin='normal' value={formPassword} onChange={(e) => setFormPassword(e.target.value)}
                        InputProps = {{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge = 'end' aria-label='toggle password visibility'>
                                        { showPassword ? <VisibilityOff/> : <Visibility/> }
                                    </IconButton>
                                </InputAdornment>
                            )

                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant='contained' onClick={handleSave}>{selectedUser ? 'Actualizar' : 'Guardar'}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}