import React, { useEffect, useState } from 'react';
import useMessage from '../hooks/MessageContext';
const History = () => {
	const { messages, dispatch } = useMessage();
	const [text, setText] = useState('');

	useEffect(() => {
		let str = '';
		messages.forEach((element) => {
			str += element.text;
		});
		setText(str);
	}, []);
	// console.log(messages);
	return <div className=' w-[200px] bg-red-500 '>{text}</div>;
};

export default History;
