import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Box, CircularProgress, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export const StatusExamenAdmin = () => {
    const [resultadosExamenAdmision, setResultadosExamenAdmision] = useState<ResultadoExamenAdmsion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const fetchResultadoExamenesAdmision = () => {
        setTimeout(() => {
            const resultados = [
                {
                    noExpediente: 'EXP-20240011',
                    anio: '2025',
                    descripcion: 'Pendiente resultado del examen de admisión',
                    nota: 0
                }
            ]
            setResultadosExamenAdmision(resultados);
            setLoading(false);
        }, 3000)

    }

    useEffect(() => {
        fetchResultadoExamenesAdmision();
    }, []);

    const paginatedResultadoExamenAdmision = resultadosExamenAdmision.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }



    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant='h4' gutterBottom>Calendario de examenes de Admisión</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No. EXPEDIENTE</TableCell>
                            <TableCell>AÑO</TableCell>
                            <TableCell>DESCRIPCION</TableCell>
                            <TableCell>NOTA</TableCell>
                            <TableCell align='right'>ACCCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedResultadoExamenAdmision.map((
                            (resultadoExamenAdmin) => (
                                <TableRow key={resultadoExamenAdmin.noExpediente}>
                                    <TableCell>{resultadoExamenAdmin.noExpediente}</TableCell>
                                    <TableCell>{resultadoExamenAdmin.anio}</TableCell>
                                    <TableCell>{resultadoExamenAdmin.descripcion}</TableCell>
                                    <TableCell>{resultadoExamenAdmin.nota}</TableCell>
                                    <TableCell align='right'>
                                        <IconButton color='primary'>
                                            <AssignmentIndIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                        {paginatedResultadoExamenAdmision.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align='center'>
                                    Aún no hay resultados cargados en el sistema.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

interface ResultadoExamenAdmsion {
    noExpediente: string;
    anio: string;
    descripcion: string;
    nota: number
}