import { Send } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { registerUser } from '../../api/auth';
import { useDispatch } from 'react-redux';

function RegisterForm() {
    const [formData, setFormData] = useState({});
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const updateFormData = (key, value) => setFormData({ ...formData, [key]: value });

    const register = (e) => {
        e.preventDefault();

        const { email, userName, password } = formData;

        if (password !== repeatPassword) {
            console.log('Las contraseñas no coinciden.');
            setError(true);
            return;
        }

        registerUser({ email, userName, password })
            .then(({ accessToken, user }) => {
                if (!user) {
                    setError(true);
                    return;
                }

                dispatch({ type: 'SET_AUTH', accessToken, user });
            });
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    error={error}
                    required
                    id="outlined-required"
                    label="Nombre de usuario"
                    value={formData.userName}
                    onChange={(e) => updateFormData('userName', e.target.value)}
                />
            </div>

            <div>
                <TextField
                    error={error}
                    required
                    id="outlined-required"
                    label="Email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                />
            </div>

            <div>
                <TextField
                    error={error}
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                />
            </div>

            <div>
                <TextField
                    error={error}
                    id="filled-password-input"
                    label="Repetir contraseña"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
            </div>

            <Button type="submit" onClick={(e) => register(e)} endIcon={<Send />}>
                Registrarse
            </Button>
        </Box>
    )
}

export default RegisterForm