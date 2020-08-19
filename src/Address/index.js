import React from 'react';
import InputField from '../InputField';
import './style.css';

const Address = ({ title, type, address, updateAddress }) => {
	const {
		firstName,
		firstNameErr,
		lastName,
		lastNameErr,
		addressLine1,
		addressLine1Err,
		addressLine2,
		addressLine2Err,
		city,
		cityErr,
		pincode,
		pincodeErr,
		state,
		stateErr,
		country,
		countryErr
	} = address;
	return (
		<div className="address">
			<p className="label">{title}</p>
			<InputField
				name={`firstName-${type}`}
				value={firstName}
				placeholder="First Name"
				errMsg={firstNameErr}
				onChange={updateAddress}
			/>
			<InputField
				name={`lastName-${type}`}
				value={lastName}
				placeholder="Last Name"
				errMsg={lastNameErr}
				onChange={updateAddress}
			/>
			<InputField
				name={`addressLine1-${type}`}
				value={addressLine1}
				placeholder="Address Line 1"
				errMsg={addressLine1Err}
				onChange={updateAddress}
			/>
			<InputField
				name={`addressLine2-${type}`}
				value={addressLine2}
				placeholder="Address Line 2"
				errMsg={addressLine2Err}
				onChange={updateAddress}
			/>
			<InputField
				name={`city-${type}`}
				value={city}
				placeholder="City"
				errMsg={cityErr}
				onChange={updateAddress}
			/>
			<InputField
				name={`state-${type}`}
				value={state}
				placeholder="State"
				errMsg={stateErr}
				onChange={updateAddress}
			/>
			<InputField
				name={`pincode-${type}`}
				value={pincode}
				type="number"
				placeholder="Pincode"
				errMsg={pincodeErr}
				onChange={updateAddress}
			/>
			<InputField
				name={`country-${type}`}
				value={country}
				placeholder="Country"
				errMsg={countryErr}
				onChange={updateAddress}
			/>
			
		</div>
	);
};

export default Address;
