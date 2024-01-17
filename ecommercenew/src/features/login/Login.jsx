import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/features/userSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import toast from 'react-hot-toast'
import "./login.css"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async () => {
        setLoading(true)
        await axios.post("https://fakestoreapi.com/auth/login", { username, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            setLoading(false)
            dispatch(login(res.data))
            localStorage.setItem("token", res.data.token)
            toast.success("Login Successfull")
            navigate("/")
        }).catch(err => {
            setLoading(false)
            dispatch(setLoading(false))
            toast.error(err)
        })
    }


    return (
        loading ? <Loader /> : <div className='login'>
            <Container component="main" maxWidth="xs" sx={{
                margin: 0
            }}>
                <CssBaseline />
                <Box
                    sx={{
                        // marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={e => handleSubmit(e)}
                        >
                            Sign In
                        </Button>

                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Login