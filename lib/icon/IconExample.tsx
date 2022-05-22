import React from 'react';
import Icon from './Icon';
import {RouteComponentProps} from 'react-router-dom';
type Props = { component: React.FunctionComponent } & RouteComponentProps;
const IconExample: React.FunctionComponent <Props> = ({ component: Component, ...rest }) => {
	return (
		<div>
			<Icon {...rest} name="qq"/>
		</div>
	);
};

export default IconExample;