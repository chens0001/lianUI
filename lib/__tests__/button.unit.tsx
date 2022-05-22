import * as renderer from 'react-test-renderer';
import * as React from 'react';
import Icon from '../icon/Icon';

describe('button', () => {
	it('是个 div', () => {
		const json = renderer.create(<Icon name='qq'/>).toJSON();
		expect(json).toMatchSnapshot();
	});
});