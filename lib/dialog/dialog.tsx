import React, {Fragment} from 'react';
import './dialog.scss';

interface DialogProps {
	visible: boolean;
}

const Dialog: React.FunctionComponent<DialogProps> = (props) => {
	const {visible} = props;

	const scopedClassMaker = (prefix: string) => {
		return (name?: string) => {
			return [prefix, name].filter(Boolean).join(('-'));
		};
	};

	const sc = scopedClassMaker('lian-ui-dialog')

	return (
		<>
			{visible ?
				<Fragment>
					<div className={sc('mask')}>
					</div>
					<div className={sc('')}>
						<div className={sc('close')} >

						</div>
						<header className={sc('header')}>
							提示
						</header>
						<main className={sc('main')}>
							{props.children}
						</main>
						{
            <footer className={sc('footer')}>
							footer
            </footer>
						}
					</div>
				</Fragment> :
				''
			}
		</>

	);
};

export default Dialog;