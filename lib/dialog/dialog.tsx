import React, {ReactElement} from 'react';
import Icon from '../icon/icon';
import './dialog.scss';
import ReactDOM from 'react-dom';

interface DialogProps {
	visible: boolean;
	buttons?: Array<ReactElement>;
	onClose: React.MouseEventHandler;
	maskClosable?: boolean;
}

const Dialog: React.FunctionComponent<DialogProps> = (props) => {
	const {visible, onClose, maskClosable} = props;
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
      <div className={sc('mask')} onClick={onclickMask}>
      </div>
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

export default Dialog;