import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './icon/Icon';

ReactDOM.render(<div>
	<Icon name="qq" onClick={() => console.log('click')}/>
</div>, document.querySelector('#root'));

