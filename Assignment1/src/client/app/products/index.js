/*
           Name: Mateo Valles
       Filename: product.service.mock.js
         Course: INFT 2202
           Date: January 24th, 2025
    Description: Contains constructors, prototypes. Previous version of the bug fixed
*/

import productService from "./product.service.mock.js";

function Product(name) {
    const form = document.createElement('form');
    let description = 'Add Product';
    let product = null;
    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');
        //create Product form content
        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        let editableInput = `<input type="text" class="form-control" id="name" name="name">`;
        let readonlyInput = `<input type="text" class="form-control" id="name" name="name" value="${Product!=null?Product.name:""}" readonly>`;
        mb3Name.innerHTML = '<label for="name" class="form-label">Product Name</label>' +
            (product!=null ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Name);

        const mb3Stock = document.createElement('div');
        mb3Stock.classList.add('mb-3');
        mb3Stock.innerHTML = '<label for="stocks" class="form-label">Stock of Product</label>' +
            '<input type="text" class="form-control" id="stocks" name="stocks">' +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Stock);
        
        const mb3Price = document.createElement('div');
        mb3Price.classList.add('mb-3');
        mb3Price.innerHTML = '<label for="prices" class="form-label">Price Number</label>' +
            '<input type="text" class="form-control" id="prices" name="prices">' +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Price);
        
        const mb3Description = document.createElement('div');
        mb3Description.classList.add('mb-3');
        mb3Description.innerHTML = '<label for="description" class="form-label">Description of this Product</label>' +
            '<input type="text" class="form-control" id="description" name="description">' +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Description);        

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
        const name = form.name.valueOf;
        const eleNameError = form.name.nextElementSibling

        if (name == "") {
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "You must name this product!";
            valid = false;
        } else {
            eleNameError.classList.add('d-none');
        }

        // I actually can't get rid of this even though I'm not showing anything related to this
        // DO NOT COMMENT THIS CODE OUT
        // test that type is valid
        const type = form.type.value;
        const eleTypeError = form.type.nextElementSibling
        if (type == "") {
            eleTypeError.classList.remove('d-none');
            eleTypeError.textContent = "What type of product is this?";
            valid = false;
        } else {
            eleTypeError.classList.add('d-none');
        }T
        const stocks = form.stocks.value;
        const eleStocksError = form.stocks.nextElementSibling
        if (stocks == "") {
            eleStocksError.classList.remove('d-none');
            eleStocksError.textContent = "How many stocks does this Product have?";
            valid = false;
        } else if (isNaN(Stocks)) {
            eleStocksError.classList.remove('d-none');
            eleStocksError.textContent = "This must be a number.";
            valid = false;
        } else {
            eleStocksError.classList.add('d-none');
        }

        const prices = form.prices.value; // check that these are numbers
        const elePricesError = form.Stocks.nextElementSibling
        if (prices == "") {
            elePricesError.classList.remove('d-none');
            elePricesError.textContent = "How much is the price of this product?";
            valid = false;
        } else if (isNaN(prices)) {
            elePricesError.classList.remove('d-none');
            elePricesError.textContent = "This must be a number.";
            valid = false;
        } else {
            elePricesError.classList.add('d-none');
        }
        const description = form.description.value;
        // return if the form is valid or not
        return valid
    }    
    // create a handler to deal with the submit event
    function submit(action) {
        // validate the form
        const valid = validate();
        // do stuff if the form is valid
        if (valid) {
            console.log('were good');

            const formData = new FormData(form);
            const productObject = {};
            formData.forEach((value, key) => {
                if (key === 'prices' || key === 'stocks') {
                    productObject[key] = Number(value);
                }
                else {
                    productObject[key] = value;
                }
            });

            const eleNameError = form.name.nextElementSibling
            try {
                if(action=="new"){
                    productService.saveProduct(productObject);
                } else {
                    productService.updateProduct(productObject)
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
            console.log('were not good');
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
        description = 'Update product';
        product = productService.findProduct(name);
        form.addEventListener('submit', function (event) {
            // prevent the default action from happening
            event.preventDefault();
            submit("update");
        });         
    }

    return {
        description,
        element: createContent()
    }
}

export default Product;