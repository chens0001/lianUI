import React from 'react';
import {scopedClassMaker} from '../helpers/classes';

interface Props extends React.HTMLAttributes<HTMLElement> {
}

const sc = scopedClassMaker('lian-ui-layout');
const Footer: React.FunctionComponent<Props> = (props) => {
	const {className, ...restProps} = props;
	return (
		<div className={sc('footer',{extra: className})} {...restProps}>{props.children}</div>
	);
};

export default Footer;