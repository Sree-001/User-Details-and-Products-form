import React, { useState, useEffect } from 'react';
import './App.css';
import { MultipleSpaceCheck, ProductTemplate, USERS_API } from './helper';
import InputField from './InputField';
import ProductTable from './Products';
import Address from './Address';
import dayjs from 'dayjs';
import Loader from './Loader';

function App() {
	function setUpInitialState({ billingAddress, shippingAddress, shippingDate, billingDate, products }) {
		setLoading(false);
		setbillingAddress(billingAddress);
		setShippingAddress(shippingAddress);
		setDates({
			shippingDate,
			billingDate
		});
		setProducts(products);
	}

	useEffect(() => {
		setLoading(true);
		fetch(USERS_API).then((data) => data.json()).then(setUpInitialState);
	}, []);
	const [ billingAddress, setbillingAddress ] = useState({});
	const [ shippingAddress, setShippingAddress ] = useState({});
	const [ dates, setDates ] = useState({});
	const [ products, setProducts ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	function updateAddress({ target: { value, name } }) {
		const [ field, addressType ] = name.split('-');
		const completeAddress = addressType === 'shipping' ? shippingAddress : billingAddress;
		const addressUpdater = addressType === 'shipping' ? setShippingAddress : setbillingAddress;
		const finalValue = value.replace(MultipleSpaceCheck, ' ');
		addressUpdater({
			...completeAddress,
			[field]: finalValue,
			[`${field}Err`]: ''
		});
	}

	function updateProducts({ target: { name, value } }) {
		const [ modifiedField, index ] = name.split('-');
		const product = products[index];
		const finalValue = value.replace(MultipleSpaceCheck, ' ');
		let modifiedProduct = { ...product, [modifiedField]: finalValue, [`${modifiedField}Err`]:'' };
		let totalPrice;
		if ([ 'quantity', 'unitPrice' ].includes(modifiedField) && value) {
			const { unitPrice, quantity } = product;
			totalPrice = (modifiedField === 'quantity' ? unitPrice : quantity) * +value;
			modifiedProduct = { ...modifiedProduct, totalPrice };
		}
		const productsCopy = [ ...products ];
		productsCopy.splice(index, 1, modifiedProduct);
		setProducts(productsCopy);
	}

	function updateDate({ target: { name, value } }) {
		setDates({
			...dates,
			[name]: value,
			[`${name}Err`]: ''
		});
	}

	function addProducts() {
		const productsCopy = [ ...products ];
		const newProducts = [ ...productsCopy, ProductTemplate ];
		setProducts(newProducts);
	}

	function deletProducts(index) {
		const productsCopy = [ ...products ];
		productsCopy.splice(index, 1);
		setProducts(productsCopy);
	}

	function validateProducts() {
		const finalProducts = [];
		let errors;
		products.forEach((product) => {
			errors = getEmptyFieldErrors({obj: product, fieldToIgnore:'notes'});
			finalProducts.push({ ...product, ...errors });
		});
		setProducts(finalProducts);
		return (Object.keys(errors).length === 0)
	}

	function getEmptyFieldErrors({obj,fieldToIgnore}) {
		const keys = Object.keys(obj);
		const errors = keys.reduce((acc, key) => {
			const isFieldEmpty = (!key.includes('Err') && !obj[key]);
			if(fieldToIgnore){
				if(isFieldEmpty && (key !== fieldToIgnore)){
					acc[`${key}Err`] = 'This field cannot be empty';
				}
			}else{
				if (isFieldEmpty) {
					acc[`${key}Err`] = 'This field cannot be empty';
				}
			}
			return acc;
		}, {});
		return errors;
		
	}

	function validateAddress({ updaterFunc, address }) {
		const errors = getEmptyFieldErrors({obj: address});
		updaterFunc({
			...address,
			...errors
		});
		return (Object.keys(errors).length === 0)
	}

	function validateDates() {
		const errors = getEmptyFieldErrors({obj: dates});
		const orderDate = dayjs(dates['billingDate']);
		const deliveryDate = dayjs(dates['deliveryDate']);
		if (deliveryDate.isBefore(orderDate)) {
			errors['billingDateErr'] = 'Order Date cannot be greater than Expected Delivery date';
		}
		setDates({
			...dates,
			...errors
		});
		return (Object.keys(errors).length === 0);
	}

	function validateFields() {
		const isShippingAddressValid = validateAddress({ updaterFunc: setShippingAddress, address: shippingAddress });
		const isBillingAddressValid = validateAddress({ updaterFunc: setbillingAddress, address: billingAddress });
		const areProductsValid = validateProducts();
		const areDatesValid = validateDates();
		(isShippingAddressValid & isBillingAddressValid & areProductsValid & areDatesValid) ?  submitForm() : alert("! Invalid data ") 
	}

	function removeErrorFields(obj) {
		const keys = Object.keys(obj);
		const keysArray = keys.filter((key) => !key.includes('Err'));
		const objWithoutErr = keysArray.reduce((acc, property) => {
			acc[property] = obj[property];
			return acc;
		}, {});
		return objWithoutErr;
	}

	function submitForm() {
		const finalObj = {
			shippingAddress: removeErrorFields(shippingAddress),
			billingAddress: removeErrorFields(billingAddress),
			dates: removeErrorFields(dates),
			products: products.map((product) => removeErrorFields(product))
		};
		
		console.log('Shipping Address');
		console.table(finalObj.shippingAddress);
		console.log('Billing Address');
		console.table(finalObj.billingAddress);
		console.log('Dates')
		console.table(finalObj.dates);
		console.log('Products')
		console.table(finalObj.products);
	}

	return (
		<div className="wrapper">
			{loading ? (
				<Loader />
			) : (
				<React.Fragment>
					<div className="card grid-container">
						<div>
							<Address
								title="Billing Address"
								type="billing"
								address={billingAddress}
								updateAddress={updateAddress}
							/>
							<div className="address">
								<InputField
									name="billingDate"
									label="Order Date"
									type="date"
									value={dates.billingDate}
									errMsg={dates.billingDateErr}
									onChange={updateDate}
								/>
							</div>
						</div>
						<div>
							<Address
								title="Shipping Address"
								type="shipping"
								address={shippingAddress}
								updateAddress={updateAddress}
							/>
							<div className="address">
								<InputField
									name="shippingDate"
									label="Expected Delivery Date"
									type="date"
									value={dates.shippingDate}
									errMsg={dates.shippingDateErr}
									onChange={updateDate}
								/>
							</div>
						</div>
					</div>
					<div className="card">
						<ProductTable
							products={products}
							updateProducts={updateProducts}
							deletProducts={deletProducts}
							addProducts={addProducts}
							save={validateFields}
						/>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default App;
