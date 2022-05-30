import * as React from 'react';
import {ReactFragment} from 'react';
import Input from '../input/input';
import classes from '../helpers/classes';
import './form.scss';

export interface FormValue {
	[K: string]: any
}

interface Props {
	value: FormValue;
	fields: Array<{ name: string, label: string, input: { type: string } }>;
	buttons: ReactFragment;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	onChange: (value: FormValue) => void;
	errors: { [K: string]: string[] };
	errorsDisplayMode?: 'first' | 'all';
	transformError?: (message: string) => string;
}

const Form: React.FunctionComponent<Props> = (props) => {
	const formData = props.value;
	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		props.onSubmit(e);
	};
	const onInputChange = (name: string, value: string) => {
		const newFormValue = {...formData, [name]: value};
		props.onChange(newFormValue);
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
			<table className="lain-ui-form-table">
				<tbody>
				{props.fields.map(f =>
					<tr className={classes('lain-ui-form-tr')} key={f.name}>
						<td className="lain-ui-form-td">
							<span className="lain-ui-form-label">{f.label}</span>
						</td>
						<td className="lain-ui-form-td">
							<Input className="lain-ui-form-input"
										 type={f.input.type}
										 value={formData[f.name]}
										 onChange={(e) => onInputChange(f.name, e.target.value)}
							/>
							<div className="lain-ui-form-error">{
								props.errors[f.name] ?
									(props.errorsDisplayMode === 'first' ?
										transformError!(props.errors[f.name][0]) : props.errors[f.name].map(transformError!).join()) :
									<span>&nbsp;</span>
							} </div>
						</td>
					</tr>
				)}
				<tr className="lain-ui-form-tr">
					<td className="lain-ui-form-td"/>
					<td className="lain-ui-form-td">
						{props.buttons}
					</td>
				</tr>
				</tbody>
			</table>
		</form>
	);
};

Form.defaultProps = {
	errorsDisplayMode: 'first',
};

export default Form;