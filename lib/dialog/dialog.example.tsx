import React, {useState} from 'react';
import Dialog from './dialog';

function DialogExample() {
	const [visible, setVisible] = useState(false);
	return (
		<>
			<button onClick={() => setVisible(!visible)}>show</button>
			<Dialog visible={visible}/>
		</>

	);
}

export default DialogExample;