import React from 'react';
import InputField from '../InputField';
import { ProductTitle } from '../helper';
import './style.css';

const ProductTable = ({ products, updateProducts, deletProducts, addProducts, save }) => {
	return (
		<div className="products-wrapper">
			<div className="product product-header">{ProductTitle.map((title) => <p key={title}>{title}</p>)}</div>
			{ 
			products.map(({
				 id, name, quantity, unitPrice, totalPrice,idErr, nameErr, quantityErr,notes, unitPriceErr, totalPriceErr,notesErr }, index) => (
				<div className="product" key={`products-${index}`}>
					<InputField type="number" name={`id-${index}`} value={id} onChange={updateProducts} errMsg={idErr} />
					<InputField name={`name-${index}`} value={name} onChange={updateProducts} errMsg={nameErr} />
					<InputField type="number" name={`quantity-${index}`} value={quantity} onChange={updateProducts}  errMsg={quantityErr} />
					<InputField type="number" name={`unitPrice-${index}`} value={unitPrice} onChange={updateProducts} errMsg={unitPriceErr} />
					<InputField
						type="number"
						disabled={true}
						name={`totalPrice-${index}`}
						value={totalPrice}
						errMsg={totalPriceErr}
					/>
					<InputField type="textbox" name={`notes-${index}`} value={notes} onChange={updateProducts} errMsg={notesErr} />
					<button className="btn btn-danger" onClick={() => deletProducts(index)}>Delete</button>
				</div>
			))}
			<div >
				<button className="btn btn-primary" onClick={addProducts}>Add Product</button>
			</div>
			<div className="text-right">
				<button className="btn btn-primary save" onClick={save}> Save </button>
			</div>
		</div>
	);
};

export default ProductTable;
