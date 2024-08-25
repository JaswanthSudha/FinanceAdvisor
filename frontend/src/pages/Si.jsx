import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from "@mui/material/Link";
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import useUserContext from '../hooks/UseContext';
import { url } from '../constants/url';

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{'Copyright © '}
			<Link
				color='inherit'
				href='https://mui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const { user, dispatch } = useUserContext();
	const [showPassword, setShowPassword] = useState(false);
	async function handleSubmit(e) {
		e.preventDefault();
		const obj = {
			email,
			password,
		};
		if (!password || !email) {
			alert('Please fill all the fields');
		}
		console.log(obj);
		const response = await fetch(`${url}/api/v1/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
		});
		const json = await response.json();
		if (json) {
			console.log(json);
		}
		//json.token
		localStorage.setItem('user', JSON.stringify(json.user));
		localStorage.setItem('token', JSON.stringify(json.token));
		dispatch({ type: 'LOGIN', payload: json.user });
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container
				component='main'
				maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						component='h1'
						variant='h5'>
						Sign in
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type={showPassword ? 'text' : 'password'}
							id='password'
							autoComplete='current-password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FormControlLabel
							control={
								<Checkbox
									value='remember'
									onClick={(e) => setShowPassword(e.target.checked)}
									color='primary'
								/>
							}
							label='Show Password'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid
								item
								xs>
								<Link
									href='#'
									variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									to='/login'
									href='#'
									variant='body2'>
									{'Already Have An Account?'}
									<span className='border-2 border-blue-500 p-2 ml-2 rounded-lg'>
										LogIn
									</span>
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
