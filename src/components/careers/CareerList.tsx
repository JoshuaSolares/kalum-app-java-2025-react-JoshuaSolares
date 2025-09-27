import React, { useEffect, useState } from 'react'
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
    DialogActions
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import Edition from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';



export const CareerList: React.FC = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    const [formNombre, setFormNombre] = useState<string>('');

    const fetchCarees = () => {
        setTimeout(() => {
            const data = [
                {
                    carreraId: 1,
                    nombre: 'Desarrollo de aplicaciones moviles con android'
                },
                {
                    carreraId: 2,
                    nombre: 'Desarrollador FullStack en Java EEE & React'
                },
                {
                    carreraId: 3,
                    nombre: 'Desarrollador FullStack con DotnCore 9 & Angular'
                },
                {
                    carreraId: 4,
                    nombre: 'Desarrollo de aplicaciones moviles con Swit'
                },
                {
                    carreraId: 5,
                    nombre: 'Dominio de contenedores con Docker'
                },
                {
                    carreraId: 6,
                    nombre: 'Despliegue de aplicaciones con Kubernetes'
                }
            ];
            setCareers(data)
            setLoading(false);
        }, 5000);
    }

    useEffect(() => {
        fetchCarees();
    }, []);


    const paginatedCareers = careers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleOpenModal = (career?: Career) => {
        console.log('carrera');
        if (career) {
            setSelectedCareer(career);
            setFormNombre(career.nombre);
        } else {
            setSelectedCareer(null);
            setFormNombre('');
        }
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCareer(null);
        setFormNombre('');
    }

    const handleSave = () => {
        handleCloseModal();
        Swal.fire({
            title: 'Carreras Técnicas',
            text: 'El registro fue almacenado correctamente.',
            icon: 'success'
        }).then((result) => {
            if (result.isConfirmed) {
                handleCloseModal();
            }
        });
    }

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Esta seguro de eliminar el registro?",
            text: "Los cambios no serán reversibles!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if(result.isConfirmed) {
                Swal.fire({
                    title: "Eliminado",
                    text: "El registro fue eliminado correctamente",
                    icon: "success"
                });
            }
        });
    }


    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant='h4' gutterBottom>Carreras Técnicas</Typography>
            <Button variant='contained' startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => handleOpenModal()}>
                Agregar Carrera
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NOMBRE</TableCell>
                            <TableCell align='right'>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCareers.map(((career) => (
                            <TableRow key={career.carreraId}>
                                <TableCell>{career.carreraId}</TableCell>
                                <TableCell>{career.nombre}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => { handleOpenModal(career) }} color='primary'>
                                        <Edition />
                                    </IconButton>
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton color='error' onClick={() => {handleDelete(career.carreraId)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )))}
                        {paginatedCareers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align='center'>
                                    No hay carreras técnicas disponibles
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination component="div" count={careers.length} page={page} onPageChange={() => { }} rowsPerPage={rowsPerPage} rowsPerPageOptions={[5, 10, 20]} />
            </TableContainer>
            <Dialog open={modalOpen} fullWidth maxWidth="sm" onClose={handleCloseModal}>
                <DialogTitle>{selectedCareer ? 'Editar Carrera' : 'Agregar Carrera'}</DialogTitle>
                <DialogContent>
                    <TextField label="nombre de la carrera" fullWidth margin='normal' value={formNombre} onChange={(e) => setFormNombre(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant='contained' onClick={handleSave}>{selectedCareer ? 'Actualizar' : 'Guardar'}</Button>
                </DialogActions>
            </Dialog>

        </Container>
    )
}

interface Career {
    carreraId: number;
    nombre: string;
}