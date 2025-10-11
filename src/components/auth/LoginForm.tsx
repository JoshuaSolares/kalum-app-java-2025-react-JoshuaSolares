import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
    onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password).then((token) => {
            Swal.fire({
                title: 'Login',
                text: 'Bienvenido al Sistema',
                icon: 'success'
            }).then((confirm) => {
                if (confirm.isConfirmed) {
                    console.log(token);
                    onLoginSuccess();
                }
            });
        });
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant='h4' gutterBottom>Iniciar sesión</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="username" fullWidth margin='normal' value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Contraseña" type='password' fullWidth margin='normal' value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}
                <Box mt={2}>
                    <Button type='submit' variant='contained' fullWidth>Login</Button>
                </Box>
            </form>
        </Container>
    )
}