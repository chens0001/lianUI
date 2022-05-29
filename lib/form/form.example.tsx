import * as React from 'react';
import Form, {FormValue} from './form';
import {useState} from 'react';

const FormExample:React.FunctionComponent = () => {
	const [formData, setFormData] = useState<FormValue>({
		username: 'name',
		password: ''
	});
	const [fields] = useState([
		{name: 'username', label: '用户名', input: {type: 'text'}},
		{name: 'image', label: '头像', input: {type: 'text'}},
		{name: 'password', label: '密码', input: {type: 'password'}},
	]);

	return (
		<Form
			fields={fields}
			value={formData}
			onChange={(newValue) => setFormData(newValue)}
			onSubmit={(newValue) => setFormData(newValue)}
			buttons={
				<>
					<button type="submit">提交</button>
					<button>返回</button>
				</>
			}
		/>
	);
};

export default FormExample;