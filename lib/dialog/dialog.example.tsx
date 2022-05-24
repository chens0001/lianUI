import React, {useState} from 'react';
import Dialog, {alert, confirm, modal} from './dialog';

export default function () {
	const [x, setX] = useState(false);
	const [y, setY] = useState(false);
	const [z, setZ] = useState(false);
	const openModal = () => {
		const close = modal(<h1>你好
			<button onClick={() => close()}>close</button>
		</h1>);
	};
	return (
		<div>
			<div>
				<h1>example Modal</h1>
				<button onClick={openModal}>modal</button>
			</div>

			<div>
				<h1>example alert confirm</h1>
				<button onClick={() => alert('1')}>alert</button>
				<button onClick={() => confirm('1', () => {
					console.log('你点击了yes');
				}, () => {
					console.log('你点击了no');
				})}>confirm
				</button>
			</div>

			<div style={{position: 'relative', zIndex: 10}}>
				<h1>example 1</h1>
				<button onClick={() => setX(!x)}>click</button>
				<Dialog visible={x} buttons={
					[
						<button onClick={() => {setX(false);}}>1</button>,
						<button onClick={() => {setX(false);}}>2</button>
					]
				} onClose={() => {setX(false);}}>
					<strong>hi</strong>
				</Dialog>
			</div>


			<div style={{position: 'relative', zIndex: 9}}>
				<h1>example 点击mask关闭</h1>
				<button onClick={() => setY(!y)}>click</button>
				<Dialog visible={y} maskClosable={true} buttons={
					[
						<button onClick={() => {setY(false);}}>1</button>,
						<button onClick={() => {setY(false);}}>2</button>
					]
				} onClose={() => {setY(false);}}>
					<strong>hi</strong>
				</Dialog>
			</div>

			<div>
				<h1>example 没有mask</h1>
				<button onClick={() => setZ(!z)}>click</button>
				<Dialog visible={z} maskClosable={true} maskVisible={false} buttons={
					[
					]
				} onClose={() => {setZ(false);}}>
					<strong>hi</strong>
				</Dialog>
			</div>
		</div>
	);
}