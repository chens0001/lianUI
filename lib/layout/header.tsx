import React from 'react';
import {scopedClassMaker} from '../helpers/classes';

interface Props extends React.HTMLAttributes<HTMLElement> {
}
const sc = scopedClassMaker('lian-ui-layout');
const Header: React.FunctionComponent<Props> = (props) => {
	const {className, ...restProps} = props
	return (
		<div className={sc('header',{extra: className})} {...restProps}>{props.children}</div>
	)
}

export default Header;