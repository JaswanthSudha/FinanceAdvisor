import { MessageContext } from '../context/Message';
import { useContext } from 'react';
const UseMessageContext = () => {
	const context = useContext(MessageContext);
	if (!context) {
		console.log('You should not use AuthContext');
		return;
	}
	return context;
};
export default UseMessageContext;
