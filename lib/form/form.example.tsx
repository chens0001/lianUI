import * as React from 'react';
import Form, {FormValue} from './form';
import {useState} from 'react';
import Validator, {noError} from './validator';

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
	const [errors, setErrors] = useState({});

	const usernames = ['frank', 'jack', 'frankfrank', 'alice', 'bob'];
	const checkUserName = (username: string, succeed: () => void, fail: () => void) => {
		setTimeout(() => {
			console.log('我现在知道用户名是否存在');
			if (usernames.indexOf(username) >= 0) {
				fail();
			} else {
				succeed();
			}
		}, 2000);
	};

	const validator = (username: string) => {
		return new Promise<string>((resolve, reject) => {
			checkUserName(username, resolve, () => reject('unique'));
		});
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const rules = [
			{key: 'username', required: true},
			{key: 'username', minLength: 8, maxLength: 16},
			{key: 'username', validator},
			{key: 'username', validator},
			{key: 'username', pattern: /^[A-Za-z0-9]+$/},
			{key: 'password', required: true},
			{key: 'password', validator},
			{key: 'password', validator},
		];
		Validator(formData, rules, (errors) => {
			console.log(errors);
			setErrors(errors);
			if (noError(errors)) {
				// 没错
			}
		});
	}

	return (
		<Form
			fields={fields}
			value={formData}
			onChange={(newValue) => setFormData(newValue)}
			onSubmit={onSubmit}
			errors={errors}
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