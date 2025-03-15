/*
           Name: Mateo Valles
       Filename: index.js
         Course: INFT 2202
           Date: March 7th, 2025
    Description: Javascript file for index.html
*/

import productService from "../product.service.js";

async function product(name) {
    const form = document.createElement('form');
    let description = 'Add Product';
    let product = null;
    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');
        //create product form content
        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        let editableInput = `<input type="text" class="form-control" id="name" name="name">`;
        let readonlyInput = `<input type="text" class="form-control" id="name" name="name" value="${product!=null?product.name:""}" readonly>`;
        mb3Name.innerHTML = '<label for="name" class="form-label">Product Name</label>' +
            (product!=null ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Name);

        const mb3Description = document.createElement('div');
        mb3Description.classList.add('mb-3');
        mb3Description.innerHTML = '<label for="description" class="form-label">Product Description</label>' +
            `<input type="text" class="form-control" id="description" name="description" value="${product!=null?product.description:""}">` +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Description);
        
        const mb3Price = document.createElement('div');
        mb3Price.classList.add('mb-3');
        mb3Price.innerHTML = '<label for="price" class="form-label">Price Value</label>' +
            '<input type="text" class="form-control" id="price" name="price">' +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Price);
        
        const mb3Stock = document.createElement('div');
        mb3Stock.classList.add('mb-3');
        mb3Stock.innerHTML = '<label for="stock" class="form-label">Number in Stock</label>' +
            '<input type="text" class="form-control" id="stock" name="stock">' +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Stock);
        
        /// I misread the contents of the assignment and accidentally thought owner was part of it. 

        // const mb3Owner = document.createElement('div');
        // mb3Owner.classList.add('mb-3');
        // mb3Owner.innerHTML = '<label for="owner" class="form-label">Owner Name</label>' +
        //     '<input type="text" class="form-control" id="owner" name="owner">' +
        //     '<p class="text-danger d-none"></p>';
        // container.append(mb3Owner);        

        const submitBtn = document.createElement('div');
        submitBtn.innerHTML = '<button type="submit" class="btn btn-primary">' +
            'Save Product <i class="fa-solid fa-check"></i>' +
            '</button>';
        container.append(submitBtn);        
        ///
        form.append(container);
        return form;
    }
    function validate() {
        let valid = true;
        // validate form
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

        // If you put error validation on this, it will not save
        const description = form.description.value;

        const price = form.price.value;
        const elePriceError = form.price.nextElementSibling
        if (price == "") {
            elePriceError.classList.remove('d-none');
            elePriceError.textContent = "What is the price of the product?";
            valid = false;
        } else if (isNaN(price)) {
            elePriceError.classList.remove('d-none');
            elePriceError.textContent = "This must be a number.";
            valid = false;
        } else {
            elePriceError.classList.add('d-none');
        }

        const stock = form.stock.value;
        const eleStockError = form.stock.nextElementSibling
        if (price == "") {
            eleStockError.classList.remove('d-none');
            eleStockError.textContent = "What is the stock of the product?";
            valid = false;
        } else if (isNaN(stock)) {
            eleStockError.classList.remove('d-none');
            eleStockError.textContent = "This must be a number.";
            valid = false;
        } else {
            eleStockError.classList.add('d-none');
        }        

        // const owner = form.owner.value;
        // const eleOwnerError = form.owner.nextElementSibling
        // if (owner == "") {
        //     eleOwnerError.classList.remove('d-none');
        //     eleOwnerError.textContent = "Who is the owner of this product?";
        //     valid = false;
        // } else {
        //     eleOwnerError.classList.add('d-none');
        // }

        return valid
    }    
    // create a handler to deal with the submit event
    async function submit(action) {
        // validate the form
        const valid = validate();
        // do stuff if the form is valid
        if (valid) {
            console.log('were good');

            const formData = new FormData(form);
            const productObject = {};
            formData.forEach((value, key) => {
                if (key === 'price' || key === 'stock') {
                    productObject[key] = Number(value);
                }
                else {
                    productObject[key] = value;
                }
            });

            console.log('Product Object:', productObject); // Debugging line

            const eleNameError = form.name.nextElementSibling
            try {
                if(action=="new"){
                    await productService.saveProduct([productObject]);
                } else {
                    await productService.updateProduct(productObject)
                } 
                eleNameError.classList.add('d-none');
                form.reset();
                window.location = './list.html';
            } catch (error) {
                console.log(error);
                eleNameError.classList.remove('d-none');
                eleNameError.textContent = "This product already exists!";
            }
            // do nothing if it's not
        } else {
            console.log('we aren\'t good');
        }
    }
    
    if (!name) {
        // assign a handler to the submit event
        form.addEventListener('submit', function (event) {
            // prevent the default action from happening
            event.preventDefault();
            submit("new");
        });
    }
    else{
        description = 'Update Product';
        try{
            let ret = await productService.findProduct(name);
            if(ret.length == 0){
                throw 'No record';
            }
            product = ret[0];
            form.addEventListener('submit', function (event) {
                // prevent the default action from happening
                event.preventDefault();
                submit("update");
            });
        }
        catch(err){
//show err on page
            description = err;
        }
    }

    return {
        description,
        element: createContent()
    }
}

export default product;