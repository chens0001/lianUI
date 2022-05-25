import React, {ReactElement} from 'react';
import Aside from './aside';
import './layout.scss';
import {scopedClassMaker} from '../helpers/classes';

const sc = scopedClassMaker('lian-ui-layout');

interface Props extends React.HTMLAttributes<HTMLElement> {
	children: ReactElement | Array<ReactElement>;
}

const Layout: React.FunctionComponent<Props> = (props) => {
	const {className, ...restProps} = props;
	const children = props.children as Array<ReactElement>;
	const hasAside = 'length' in children && children.reduce((child, node) => child || node.type === Aside, false);
	return (
		<div className={sc({'': true, hasAside}, {extra: className})} {...restProps}>{props.children}</div>
	);
};

export default Layout;