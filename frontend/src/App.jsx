import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Si from './pages/Si';
import Lo from './pages/Lo';
import Chatbot from './pages/Chatbot';
import useUserContext from '../src/hooks/UseContext';
import Profile from './pages/Profile';
import './App.css';
import Navbar from './components/Navbar';
const App = () => {
	const { user } = useUserContext();

	return (
		<div
			style={{
				backgroundImage: "url('./image.png')",
			}}>
			<BrowserRouter>
				{user && <Navbar></Navbar>}

				<Routes>
					<Route
						path='/'
						element={user ? <Chatbot /> : <Navigate to='/login' />}
					/>
					<Route
						path='/login'
						element={user ? <Navigate to='/chatbot' /> : <Lo />}
					/>
					<Route
						path='/signup'
						element={user ? <Navigate to='/chatbot' /> : <Si />}
					/>
					<Route
						path='/chatbot'
						element={!user ? <Navigate to='/login' /> : <Chatbot />}
					/>
					<Route
						path='/profile'
						element={user ? <Profile /> : <Lo />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
export default App;
