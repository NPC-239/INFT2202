/*
           Name: Mateo Valles
       Filename: create.js
         Course: INFT 2202
           Date: March 14th, 2025
    Description: Javascript for creating a product
*/

// tell us what page we're on
console.log('we are on the add page');

// assign a handler to the submit event
document.getElementById('product-form')
    .addEventListener('submit', submitProductForm);
// create a handler to deal with the submit event
async function submitProductForm ( event ) {
    // prevent the default action from happening
    event.preventDefault();
    // get a reference to the form (from the event)
    const productForm = event.target;  
    // validate the form
    const valid = validateProductForm(productForm);
    // do stuff if the form is valid
    if (valid) {
        console.log('were good');
        
        const formData = new FormData(productForm);
        //create a javascript object to hold the form data
        const productObject = {};
        formData.forEach((value, key) => {
            //by default, a value from form is string
            //we need to convert them accordingly
            if(key === 'price' || key ==='stock'){
                productObject[key] = Number(value);
            }
            else{
                productObject[key] = value;
            }
        });

        const eleNameError = productForm.name.nextElementSibling
        try {
            await productService.saveProduct(productObject)
            eleNameError.classList.add('d-none');
            productForm.reset();
            window.location = './list.html';
        } catch (error) {
            console.log(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This product already exists!";
        }        
    // do nothing if it's not
    } else {
        console.log('were not good');
    }
}

// validate the product form
function validateProductForm ( form ) {
    console.log('validating')
    let valid = true;
    // test that name is valid
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling
    if (name == "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this product!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }
    // add validation for the remaining fields. 

    // return if the form is valid or not
    return valid
}