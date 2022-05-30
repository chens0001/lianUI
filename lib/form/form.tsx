import * as React from 'react';
import {ReactFragment} from 'react';
import classes from '../helpers/classes';
import Input from '../input/input';

export interface FormValue {
	[K: string]: any;
}

interface Props {
	value: FormValue;
	fields: Array<{ name: string, label: string, input: { type: string } }>;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	buttons: ReactFragment;
	errors: { [K: string]: string[] };
	errorsDisplayMode?: 'first' | 'all';
	onChange: (value: FormValue) => void;
	transformError?: (message: string) => string;
}

const Form: React.FunctionComponent<Props> = (props) => {
	const {onSubmit, fields, buttons, onChange, value} = props;
	const _formData = value;

	const onInputChange = (name: string, value: string) => {
		const newFormValue = {
			..._formData,
			[name]: value
		};
		onChange(newFormValue);
	};

	const transformError = (message: string) => {
		const map: any = {
			required: '必填',
			minLength: '太短',
			maxLength: '太长',
		};
		return props.transformError && props.transformError(message) || map[message] || '未知错误';
	};

	return (
		<form onSubmit={onSubmit}>
			<table className="fui-form-table">
				<tbody>
				{fields.map(f =>
					<tr className={classes('fui-form-tr')} key={f.name}>
						<td className="fui-form-td">
							<span className="fui-form-label">{f.label}</span>
						</td>
						<td className="fui-form-td">
							<Input
								className="fui-form-input"
								type={f.input.type}
								value={_formData[f.name]}
								onChange={(e) => onInputChange(f.name, e.target.value)}
							/>
							<div className="fui-form-error">{
								props.errors[f.name] ?
									(props.errorsDisplayMode === 'first' ?
										transformError!(props.errors[f.name][0]) : props.errors[f.name].map(transformError!).join()) :
									<span>&nbsp;</span>
							} </div>
						</td>
					</tr>
				)}
				<tr className="fui-form-tr">
					<td className="fui-form-td"/>
					<td className="fui-form-td">
						{buttons}
					</td>
				</tr>
				</tbody>
			</table>
		</form>
	);
};

export default Form;