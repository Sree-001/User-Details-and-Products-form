import React from 'react';
import './style.css';

const TextBox = ({ name, value, onChange }) => {
	return <textarea className="text-box" onChange={onChange} name={name} value={value} />;
};

const InputField = ({ name, label, type, value, errMsg, onChange, placeholder, disabled }) => {
	return (
		<div className="field-wrapper">
			<label className="label" htmlFor="">
				{label}
			</label>
			{ type === 'textbox' ? (
				<TextBox name={name} value={value} onChange={onChange} />
			) : (
				<input
					className={`${type === 'date'? 'date-field':'field'}`}
					type={type}
					value={value}
					onChange={onChange}
					name={name}
					min="0"
					placeholder={placeholder}
					disabled={disabled}
				/>
			)}

			{errMsg && <p className="err-msg">{errMsg}</p>}
		</div>
	);
};

export default InputField;
