import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material'
import type { RootState } from '../../store/store';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

type Params = {
    noExpediente: string;
};

export const FinalizeCandidateProcess = () => {
    const navigate = useNavigate();
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : null;
    const { noExpediente } = useParams<Params>();
    const [email,setEmail] = useState(user?.email);
    const [identityUser, setIdentityUser] = useState(noExpediente);
    const [error,setError] = useState('');
    
    const handleSubmit = () => {        
        Swal.fire({
            icon: 'success',
            title: 'Examen de admisión',
            text: 'Su proceso de admision fue actualizado exitosamente, consultar el estatus del examen de admisión.',
            footer: 'Kalum v1.0.0'
        }).then(response => {
            if(response.isConfirmed){
                navigate('/status-examen-admision');
                console.log(user);
            }
        });
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant='h4' gutterBottom>Finalizar proceso de solicitud de examen</Typography>
            <form>
                <TextField label="Email" fullWidth margin='normal' value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Indentificador" fullWidth margin='normal' value={identityUser} onChange={(e) => setIdentityUser(e.target.value)} />
                {error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}
                <Box mt={2}>
                    <Button variant='contained' fullWidth onClick={handleSubmit}>Enviar</Button>
                </Box>
            </form>
        </Container>
    )
}