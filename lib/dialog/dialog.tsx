import React, {ReactElement, ReactNode} from 'react';
import Icon from '../icon/icon';
import './dialog.scss';
import ReactDOM from 'react-dom';

interface DialogProps {
	visible: boolean;
	buttons?: Array<ReactElement>;
	onClose: React.MouseEventHandler;
	maskClosable?: boolean;
	maskVisible?: boolean;
}

const Dialog: React.FunctionComponent<DialogProps> = (props) => {
	const {visible, onClose, maskClosable, maskVisible} = props;
	const scopedClassMaker = (prefix: string) => {
		return (name?: string) => {
			return [prefix, name].filter(Boolean).join(('-'));
		};
	};
	const sc = scopedClassMaker('lian-ui-dialog');

	const onclickMask: React.MouseEventHandler = (e) => {
		maskClosable && onClose(e);
	};
	const DialogContent = visible && <>
		{ maskVisible && <div className={sc('mask')} onClick={onclickMask} /> }
      <div className={sc('')}>
          <div className={sc('close')} onClick={onClose}>
              <Icon name="close"/>
          </div>
          <header className={sc('header')}>
              提示
          </header>
          <main className={sc('main')}>
						{props.children}
          </main>
				{props.buttons && props.buttons.length > 0 &&
        <footer className={sc('footer')}>
					{props.buttons && props.buttons.map((button, index) =>
						React.cloneElement(button, {key: index})
					)}
        </footer>
				}
      </div>
  </>;
	return (
		ReactDOM.createPortal(DialogContent, document.body)
	);
};
const modal = (content: ReactNode, buttons?: Array<ReactElement>, afterClose?: () => void) => {
	const component = <Dialog
		visible={true}
		buttons={buttons}
		onClose={() => {
			close();
			afterClose && afterClose();
		}}
	>
		{content}
	</Dialog>;

	const close = () => {
		ReactDOM.render(React.cloneElement(component, {visible: false}), div);
		ReactDOM.unmountComponentAtNode(div);
		div.remove();
	};
	const div = document.createElement('div');
	document.body.append(div);
	ReactDOM.render(component, div);
	return close;
};

const confirm = (content: string, yes?: () => void, no?: () => void) => {

	const onOk = () => {
		close();
		yes && yes();
	};

	const onNo = () => {
		close();
		no && no();
	};

	const buttons = [
		<button onClick={onOk}>yes</button>,
		<button onClick={onNo}>no</button>
	];
	const close = modal(content, buttons, no);
};

const alert = (content: string) => {
	const buttons = <button onClick={() => close()}>OK</button>;
	const close = modal(content, [buttons]);
};
Dialog.defaultProps = {
	maskVisible: true
};

export {alert, modal, confirm};
export default Dialog;