import React from 'react';
import useAuthContext from '../hooks/UseContext';
import profileImage from '../images/frontend.jpeg';
// import { url } from '../constants/url';

const Profile = () => {
	const { dispatch, user } = useAuthContext();
	const username = user?.email.replace('@gmail.com', '');
	// console.log(email.replace('@gmail.com', ''));
	return (
		<div className='px-24'>
			<div className='flex justify-center flex-col items-center m-4'>
				<img
					className='rounded-md h-[200px] w-[200px]'
					src={profileImage}
					alt=''
				/>
				<button className='m-2 bg-red-500 py-2 px-4 rounded-lg text-white hover:bg-red-300'>
					Update
				</button>
			</div>
			<div className='flex flex-col justify-start items-center  w-3/4'>
				<div className='grid grid-cols-2 w-2/4'>
					<h1 className='text-2xl font-serif m-2'>UserName:</h1>
					<input
						type='text'
						placeholder='username'
						value={username}
						className='border-b-2 decoration-3 text-lg '
					/>
				</div>
				<div className='grid grid-cols-2 w-2/4'>
					<h1 className='text-2xl font-serif m-2'>Email:</h1>
					<input
						className='border-b-2 '
						type='email'
						placeholder='email'
						value={user?.email}
					/>
				</div>
				<div className='grid grid-cols-2  w-2/4 '>
					<h1 className='text-2xl font-serif m-2'>Contact:</h1>
					<input
						className='border-b-2'
						style={{
							textDecoration: 'none',
						}}
						type='text'
						placeholder='number'
						value={user?._id}
					/>
				</div>
			</div>
		</div>
	);
};

export default Profile;
