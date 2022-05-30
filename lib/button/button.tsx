import * as React from 'react';
import Icon from '../icon/icon';
import {ButtonHTMLAttributes, Fragment, useState} from 'react';
import './button.scss';
import classes, {createScopedClasses} from '../helpers/classes';

const componentName = 'Button';
const sc = createScopedClasses(componentName);

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: string;
	iconPosition?: 'left' | 'right';
	iconFill?: string;
	size?: 'small' | 'big';
	level?: 'default' | 'important' | 'danger';
	ghost?: boolean;
	badge?: number | string;
	href?: string;
	target?: string;
	disabled?: boolean;
	loading?: boolean;
	type?: 'button' | 'submit' | 'reset';
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FunctionComponent<IProps> = (props) => {
	const [state] = useState({
		hideLoadingAtFirst: props.loading !== true && !props.icon
	});
	const afterLoadingIconMount = (el: Element) => {
		if (!state.hideLoadingAtFirst) {return;}
		el.classList.add('gu-button-loadingIcon-animationStart');
		el.getBoundingClientRect();
		el.classList.add('gu-button-loadingIcon-animationEnd');
		el.addEventListener('transitionend', afterTransition.bind(null, el));
	};
	const afterTransition = (el: Element) => {
		el.classList.remove('gu-button-loadingIcon-animationStart', 'gu-button-loadingIcon-animationEnd');
	};
	const disabled = props.loading || props.disabled;
	const buttonClass = classes(sc('', props.level, props.size, {
		ghost: props.ghost,
		disabled: props.disabled
	}), props.className);
	const icon = props.icon && <Icon key="notLoadingIcon" name={props.icon} fill={props.iconFill}/>;
	const loadingIcon = (
		<Icon key="loadingIcon" aftermount={afterLoadingIconMount} name="loading"
					className={sc('loadingIcon')}/>
	);
	const onClick = (e: React.MouseEvent) => {
		if (props.disabled) {return e.preventDefault(); }
		props.onClick && props.onClick.call(e.target, e);
	};
	const iconWrapper = props.loading ? loadingIcon : icon;
	const content = typeof props.children === 'string' ? <span>{props.children}</span> : props.children;
	const elBadge = props.badge && <div className={sc('badge')}><span>{props.badge}</span></div>;
	const inner = (
		props.iconPosition === 'left' ?
			<Fragment> {iconWrapper} {content} {elBadge} </Fragment>
			:
			<Fragment> {content} {iconWrapper} {elBadge} </Fragment>
	);
	const button = props.href === undefined ?
		(
			<button className={buttonClass} style={props.style} onClick={onClick} disabled={disabled} type={props.type}>
				{inner}
			</button>
		) :
		(
			<a href={props.href} target={props.target} className={buttonClass} style={props.style} onClick={onClick}
				 tabIndex={props.disabled ? -1 : undefined}>
				{inner}
			</a>
		)
	;

	return button;
};
Button.displayName = componentName;
Button.defaultProps = {
	level: 'default',
	ghost: false,
	iconPosition: 'left',
	disabled: false,
	loading: false,
	type: 'button'
};
Button.propTypes = {};
export default Button;