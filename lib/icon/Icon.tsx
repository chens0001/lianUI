import React from 'react';
import './importIcons';
import './icon.scss'

interface iconProps {
	name: string;
}

const Icon: React.FunctionComponent<iconProps> = (props) => {
	return (
		<span>
		  <svg className='lianui-icon'>
			<use xlinkHref={`#${props.name}`}/>
		  </svg>
    	</span>
	);
};
export default Icon;