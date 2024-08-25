import React from 'react';
import useAuthContext from '../hooks/UseContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { url } from '../constants/url';
const Navbar = () => {
	const { pathname } = useLocation();
	const { dispatch, user } = useAuthContext();
	const handleLogout = () => {
		if (window.confirm('Are you sure you want to logout?')) {
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			dispatch({ type: 'LOGOUT' });
		} else {
			return;
		}
	};
	const handeleDeleteChat = async () => {
		const response = await fetch(`${url}/api/v1/message/messages`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
			},
		});
		const json = await response.json();
		console.log(json);
	};
	return (
		<div className='md:flex md:justify-between md:gap-2 p-8  grid '>
			<Link
				to='/'
				className='text-6xl font-bold text-gray-800'>
				FinChat
			</Link>

			<div className='flex justify-between items-center gap-6'>
				{pathname === '/chatbot' ||
					(pathname === '/' && (
						<MdDelete
							onClick={handeleDeleteChat}
							className='h-[30px] w-[30px]'
						/>
					))}
				<Link to='/profile'>
					<AccountCircleIcon />
					{user?.email}
				</Link>
				<button onClick={handleLogout}>LogOut</button>
			</div>
		</div>
	);
};

export default Navbar;
