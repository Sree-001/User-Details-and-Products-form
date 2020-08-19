import React from 'react';
import './style.css';
const Loader = () => {
	return (
		<div className="loader-wrapper">
            <div className="text-center">
            <div className="lds-ripple">
				<div />
				<div />
			</div>
				<h3>Fetching User Data</h3>
				<h4>Please wait ... </h4>
            </div>
			
		</div>
	);
};

export default Loader;
