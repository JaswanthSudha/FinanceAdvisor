import React, { useEffect, useState, useRef } from 'react';
import Loading from '../components/Loading';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ReactMarkDown from 'react-markdown';
import useMessage from '../hooks/MessageContext';
import History from '../components/History';
import { MdDelete } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { url } from '../constants/url';
const Chatbot = () => {
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState(true);
	const { messages: allMessages, dispatch } = useMessage();
	const location = useLocation();

	const bottomRef = useRef(null);

	useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
		}
		setTimeout(() => {
			setLoading(false);
		}, [3000]);
		console.log(location.pathname);
		console.log(allMessages);
	}, []);
	useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [query, response]);
	useEffect(() => {
		const getAllUserMessage = async () => {
			try {
				const response = await fetch(`${url}/api/v1/message/messages`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token'),
						)}`,
					},
				});
				const json = await response.json();

				dispatch({ type: 'SET_MESSAGES', payload: json.messages });
			} catch (error) {
				console.log('Error in getting all user messages', error);
			}
		};
		getAllUserMessage();
	}, [allMessages]);

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};
	const handleFileSubmit = async (e) => {
		e.preventDefault();
		if (!e.target.files[0]) {
			alert('Please Select a File');
		}
		const formData = new FormData();
		formData.append('file', e.target.files[0]);
		const response = await fetch(`${url}/api/v1/file/upload`, {
			method: 'POST',
			body: formData,
		});
		const json = await response.json();
		console.log(json);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setResponse(false);
		if (query.trim() !== '') {
			const newMessage = {
				id: Date.now(),
				text: query,
				isUser: true,
			};
			setQuery('');
			dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
			// setMessages([...messages, newMessage]);
			console.log('message', allMessages);
			await createUserMessage(newMessage);
			const response = await fetch(`${url}/api/v1/gemini/getAdvice`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				},
				body: JSON.stringify({ query: newMessage.text }),
			});
			const json = await response.json();
			console.log('json', json);
			if (json.response) {
				const obj = {
					id: Date.now(),
					text: json.response,
					isUser: false,
				};
				await createUserMessage(obj);
				// setMessages([...messages, newMessage, obj]);
				setResponse(true);

				dispatch({ type: 'ADD_MESSAGE', payload: obj });
			}
		}

		setResponse(true);
	};
	const createUserMessage = async (obj) => {
		try {
			const response = await fetch(`${url}/api/v1/message/message `, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				},
				body: JSON.stringify(obj),
			});
			const json = await response.json();
			console.log(json);
		} catch (error) {
			console.log('Error in creating user message', error);
		}
	};

	if (loading) {
		return (
			<div className='h-screen w-full flex justify-center items-center'>
				<Loading />
			</div>
		);
	}

	return (
		<div className='flex '>
			{/* <aside>
				<History />
			</aside> */}
			{/* <aside>
				<button className='p-2 border-2 rounded-lg bg-red-500 text-white w-[100px]'>
					Clear Chat
				</button>
			</aside> */}
			<div
				className='p-20 overflow-hidden  w-full'
				style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
				{allMessages === undefined || allMessages?.length === 0 ? (
					<div className='text-3xl font-serif '>No Recent Chats</div>
				) : (
					allMessages?.map((message) => (
						<div key={message._id}>
							{message.isUser ? (
								<div
									ref={bottomRef}
									className='flex justify-end'>
									<div className='p-3  rounded-lg bg-black text-white'>
										<strong className='text-gray-900'>
											{/* <RecordVoiceOverIcon /> */}
										</strong>{' '}
										{message.text}
									</div>
								</div>
							) : (
								<div
									ref={bottomRef}
									className='w-2/4'>
									<div className='p-2'>
										<strong>
											<SmartToyIcon />
										</strong>{' '}
										<ReactMarkDown children={message.text}>
											{message.text}
										</ReactMarkDown>
									</div>
								</div>
							)}
						</div>
					))
				)}
				{!response && allMessages?.length > 0 && (
					<div ref={bottomRef}>Your Bot Is Working On It....</div>
				)}
			</div>

			<form
				className='w-full flex p-10 justify-evenly items-center'
				onSubmit={handleFormSubmit}
				style={{ position: 'fixed', bottom: 10 }}>
				<div className=''>
					<label
						for='uploadFile1'
						class='flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							class='w-6 mr-2 fill-white inline'
							viewBox='0 0 32 32'>
							<path
								d='M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z'
								data-original='#000000'
							/>
							<path
								d='M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z'
								data-original='#000000'
							/>
						</svg>
						Upload
						<input
							type='file'
							id='uploadFile1'
							class='hidden'
							onChange={handleFileSubmit}
						/>
					</label>
				</div>

				<input
					className='border border-gray-400 w-1/2 p-2'
					style={{
						width: '80%',
						borderRadius: '10px',
						padding: '10px',
						border: '1px solid #ccc',
						textDecoration: 'none', // Remove text decoration
					}}
					type='text'
					value={query}
					onChange={handleInputChange}
					placeholder='Type your query...'
				/>
				<button
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded '
					type='submit'>
					Send
				</button>
			</form>
		</div>
	);
};

export default Chatbot;
