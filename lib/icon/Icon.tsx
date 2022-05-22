
import React from 'react';
import './importIcons';
import './icon.scss';

interface iconProps extends React.SVGAttributes<SVGElement> {
	name: string;
}

const Icon: React.FunctionComponent<iconProps> = (props) => {
	return (
		<svg
			className="lianui-icon"
			{...props}
		>
			<use xlinkHref={`#${props.name}`}/>
		</svg>
	);
};
export default Icon;