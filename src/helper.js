export const MultipleSpaceCheck = /\s\s+/g;
export const Alphaneumeric = /^[A-Z0-9]+$/i;
export const USERS_API = 'https://5f33f81c9124200016e184b5.mockapi.io/casaone/getUserData';
export const ProductTitle = ['Product Id','Product name', 'Quantity ','Unit Price', 'Total Price','Notes '];
export const ProductTemplate = {
        id: '',
        idErr:'',
        name: '',
        nameErr:'',
        quantity: '',
        quantityErr:'',
        unitPrice: '',
        unitPriceErr:'',
        totalPrice: '',
        totalPriceErr:'',
        notes: '',
        notesErr:''
    }

export const AddressTemplate = {
    firstName: 'James',
    firstNameErr: '',
    lastName: 'Kepler',
    lastNameErr: '',
    addressLine1:'',
    addressLine1Err:'',
    addressLine2:'',
    addressLine2Err:'',
    city:'',
    cityErr:'',
    pincode:'',
    pincodeErr:'',
    state:'',
    stateErr:'',
    country:''
};