import React, {useState} from 'react';
import Dialog from './dialog';

function DialogExample() {
	const [visible, setVisible] = useState(false);
	const [visibleMask, setVisibleMask] = useState(false);
	const onClose = () => {
		setVisible(false)
	}
	const onCloseMask = () => {
		setVisibleMask(false)
	}
	return (
		<>
			<button onClick={() => setVisible(!visible)}>show</button>
			<Dialog visible={visible} onClose={onClose} maskClosable={false} buttons={[
				<button onClick={onClose}>yes</button>,
				<button >no</button>
			]}>
				hello
			</Dialog>

			<button onClick={() => setVisibleMask(!visibleMask)}>closeMask</button>
			<Dialog visible={visibleMask} onClose={onCloseMask} maskClosable={true} buttons={[
				<button onClick={onCloseMask}>yes</button>,
				<button >no</button>
			]}>
				hello
			</Dialog>

		</>

	);
}

export default DialogExample;