import * as React from 'react';
import {ReactFragment} from 'react';

export interface FormValue {
	[K: string]: any
}

interface Props {
	value: FormValue;
	fields: Array<{ name: string, label: string, input: { type: string } }>;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	buttons: ReactFragment;
	onChange: (value: FormValue) => void;
}

const Form: React.FunctionComponent<Props> = (props) => {
	const {onSubmit, fields, buttons, onChange, value} = props;
	const _formData = value;

	const onInputChange = (name: string, value: string) => {
		const newFormValue = {
			..._formData,
			[name]: value
		}
		onChange(newFormValue)
	}

	return (
		<form onSubmit={onSubmit}>
			{fields.map(f => (
				<div key={f.name}>
					{f.label}
					<input
						type={f.input.type}
						onChange={(e) => onInputChange(f.name, e.target.value)}
						value={_formData[f.name]}
					/>
				</div>
			))}
			<div>
				{buttons}
			</div>
		</form>
	);
};

export default Form;