import React, {ButtonHTMLAttributes} from 'react';
import classes from '../helpers/classes';
import './button.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	level?: 'important' | 'danger' | 'normal';
}

const Button: React.FunctionComponent<Props> = (props) => {
	const {className, level, children, ...rest} = props;
	return (
		<button className={classes('lian-ui-button', `lian-ui-button-${level}`, className)} {...rest}>
			{children}
		</button>
	);
};

Button.defaultProps = {
	level: 'normal'
};

export default Button;