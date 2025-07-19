document.addEventListener("DOMContentLoaded", function () {
    
    let root = document.querySelector("#root > #products-root");
    
    let productsAddedInCart = 0;

    // Initialize modal functionality
    initializeModal();

    fetchAndStoreProducts();
    
    // Set up event delegation for cart and delete buttons
    setupEventDelegation();

    clearDatabase();

    alert(123);

    function clearDatabase() {

        document.querySelector('#clear-database').addEventListener('click', function (e) {
            e.preventDafault;

            if (!confirm("Are you sure you want to clear the database? This action cannot be undone.")) {
                return;
            }

            localStorage.removeItem('products');

            location.reload(); // Reload the page to reflect changes
        });
    }

    function fetchAndStoreProducts() {
        fetch("https://dummyjson.com/products")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let products = data.products;
                console.log("Fetched products:", products);

                // Get existing products from localStorage
                let existingProducts = [];
                let productsInStorage = localStorage.getItem('products');
                // console.log("Products in localStorage:", productsInStorage);
                if (productsInStorage) {
                    existingProducts = JSON.parse(productsInStorage);
                    // console.log("Existing products in localStorage:", existingProducts);
                }


                let processedProducts = [
                    {
                        id: 99999,
                        title: "Product 99999",
                        description: "Description 1",
                        price: 100,
                        image: "https://picsum.photos/200/200",
                        category: "Category 1",
                        subcategory: "Subcategory 1",
                        stock: 0
                    }
                ];

                if (existingProducts.some(product => product.id === 99999)) {
                    processedProducts = [...existingProducts];
                } else {
                    processedProducts = [...existingProducts, ...processedProducts];
                }


                let categories = [];
                let newProductsCount = 0;

                for (let i = 0; i < products.length; i++) {
                    let currentProduct = products[i];
                    
                    // Check if product already exists by ID

                    if (!categories.includes(currentProduct.category)) {
                        categories.push(currentProduct.category);
                    }

                    let productExists = false;
                    for (let j = 0; j < processedProducts.length; j++) {
                        let processedProduct = processedProducts[j];
                        if (processedProduct.id === currentProduct.id) {
                            productExists = true;
                        }
                    }

                    if (productExists) {
                        console.log(`Product with ID ${currentProduct.id} already exists, skipping...`);
                        continue; // Skip this product
                    }
            
                    // Process new product
                    currentProduct.image = 'https://picsum.photos/200/200?id=' + i;

               
                    if (i % 2 == 0) {
                        currentProduct.subcategory = 'general';
                    } else {
                        currentProduct.subcategory = 'specialized';
                    }

                    let product = new Product(
                        currentProduct.id, 
                        currentProduct.title, 
                        currentProduct.description, 
                        currentProduct.price,
                        currentProduct.image, 
                        currentProduct.category, 
                        currentProduct.subcategory,
                        currentProduct.stock
                    );

                    processedProducts.push(product);
                    newProductsCount++;
                }

                console.log("Categories:", categories);
                console.log(`Added ${newProductsCount} new products, total products: ${processedProducts.length}`);
                
                // Store updated products in localStorage

                processedProducts = processedProducts.sort(function(a, b) {
                    return b.id - a.id;
                });
                
                localStorage.setItem('products', JSON.stringify(processedProducts));
                console.log("Products updated in localStorage");

                console.log("Processed products:", processedProducts);

                return processedProducts;
                // Render all products (existing + new)
            })
            .then((processedProducts) => {
                renderProducts(processedProducts);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                
                // If fetch fails, try to load from localStorage
                let productsInStorage = localStorage.getItem('products');
                if (productsInStorage) {
                    console.log("Loading existing products from localStorage due to fetch error");
                    let existingProducts = JSON.parse(productsInStorage);
                    renderProducts(existingProducts);
                } else {
                    console.log("No products available in localStorage and fetch failed");
                }
            });
    }

    function renderProducts(products) {
        // Clear existing content
        root.innerHTML = '';

        for (let k = 0; k < products.length; k++) {
            let product = products[k];
            product = new Product(
                product.id, 
                product.title, 
                product.description, 
                product.price, 
                product.image, 
                product.category, 
                product.subcategory,
                product.stock
            );

            let borderClass = '';
            if ((k + 1) % 3 != 0) {
                borderClass = 'border-end border-dark border-3 d-none d-md-block';
            }

            let productElem = document.createElement('div');

            let stockElement = product.isInStock() ? '<p class="text-success">In Stock</p>' : '<p class="text-danger">Out of Stock</p>';

            productElem.className = `col-12 col-md-4 prod-${k + 1} text-left px-4 ${borderClass} my-3`;
            productElem.id = `product-elem-${product.id}`;
            productElem.innerHTML = `
                <img src="${product.image}" class="img-fluid"/>
                <h2 class="my-4">${product.title}</h2>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>            
                <p>${stockElement}</p>
                <button class="btn btn-primary addToCartButton" data-id="${product.id}" ${!product.isInStock() ? 'disabled' : ''}>
                    <i class="fa-solid fa-cart-plus"></i>
                </button>


                <button class="btn btn-danger deleteProductButton" data-id="${product.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            root.appendChild(productElem);
        }

        // Event listeners are handled by delegation in the initialization
    }

    function setupEventDelegation() {
        // Single event listener on the parent container handles all button clicks
        root.addEventListener('click', function(event) {
            // Check if clicked element is an add to cart button or its child (icon)
            let cartButton = event.target.closest('.addToCartButton');
            if (cartButton) {
                console.log("Cart button clicked for product:", cartButton.getAttribute('data-id'));
                productsAddedInCart++;
                alert(`We have ${productsAddedInCart} products in cart`);
                return;
            }

            // Check if clicked element is a delete button or its child (icon)
            let deleteButton = event.target.closest('.deleteProductButton');
            if (deleteButton) {
                console.log("Delete product button clicked");
                
                if (!confirm("Are you sure you want to delete this product?")) {
                    return;
                }

                let productId = deleteButton.getAttribute('data-id');
                console.log("Product ID to delete:", productId);
                
                let productElemFound = document.getElementById(`product-elem-${productId}`);
                productElemFound.remove();

                let productsInStorage = localStorage.getItem('products');
                let products = JSON.parse(productsInStorage);
                
                // Convert productId to number for proper comparison
                let productIdNumber = parseInt(productId);
                products = products.filter(function(product) {
                    return product.id !== productIdNumber;
                });

                localStorage.setItem('products', JSON.stringify(products));
                console.log("Product deleted from localStorage");
                return;
            }
        });
    }

    function initializeModal() {
        // Set up modal event listeners
        const addProductModal = document.getElementById('addProductModal');
        const saveProductBtn = document.getElementById('saveProductBtn');
        const addProductForm = document.getElementById('addProductForm');
        const newCategoryInput = document.getElementById('newCategory');
        const newSubcategoryInput = document.getElementById('newSubcategory');
        const categorySelect = document.getElementById('productCategory');
        const subcategorySelect = document.getElementById('productSubcategory');

        // Populate dropdowns when modal opens
        addProductModal.addEventListener('show.bs.modal', function () {
            populateCategories();
            populateSubcategories();
        });

        // Handle new category input
        newCategoryInput.addEventListener('input', function () {
            if (this.value.trim()) {
                categorySelect.value = '';
            }
        });

        // Handle new subcategory input
        newSubcategoryInput.addEventListener('input', function () {
            if (this.value.trim()) {
                subcategorySelect.value = '';
            }
        });

        // Handle form submission
        saveProductBtn.addEventListener('click', function () {
            if (validateForm()) {
                addNewProduct();
                console.log("Form submitted");
            }
        });

        
        // Handle Enter key in form
        addProductForm.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (validateForm()) {
                    addNewProduct();
                }
            }
        });


    }

    function populateCategories() {
        const categorySelect = document.getElementById('productCategory');
        const existingCategories = extractCategories();

        // Clear existing options except the first one
        categorySelect.innerHTML = '<option value="">Select or add category...</option>';

        // Add existing categories
        existingCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    function populateSubcategories() {
        const subcategorySelect = document.getElementById('productSubcategory');
        const existingSubcategories = extractSubcategories();

        // Clear existing options except the first one
        subcategorySelect.innerHTML = '<option value="">Select or add subcategory...</option>';

        // Add existing subcategories
        existingSubcategories.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = subcategory;
            subcategorySelect.appendChild(option);
        });
    }

    function extractCategories() {
        const products = getStoredProducts();
        const categories = [];

        products.forEach(product => {
            if (product.category) {
                categories.push(product.category);
            }
        });

        return categories.sort();
    }

    function extractSubcategories() {
        const products = getStoredProducts();
        const subcategories = [];

        products.forEach(product => {
            if (product.subcategory) {
                subcategories.push(product.subcategory);
            }
        });

        return subcategories.sort();
    }

    function validateForm() {

        const form = document.getElementById('addProductForm');
        const titleInput = document.getElementById('productTitle');
        const priceInput = document.getElementById('productPrice');
        const descriptionInput = document.getElementById('productDescription');
        const categorySelect = document.getElementById('productCategory');
        const subcategorySelect = document.getElementById('productSubcategory');
        const newCategoryInput = document.getElementById('newCategory');
        const newSubcategoryInput = document.getElementById('newSubcategory');

        let isValid = true;

        // Reset validation classes
        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

        // Validate title
        if (!titleInput.value.trim()) {
            titleInput.classList.add('is-invalid');
            isValid = false;
        }

        // Validate price
        if (!priceInput.value || parseFloat(priceInput.value) <= 0) {
            priceInput.classList.add('is-invalid');
            isValid = false;
        }

        // Validate description
        if (!descriptionInput.value.trim()) {
            descriptionInput.classList.add('is-invalid');
            isValid = false;
        }

        // Validate category (either selected or new)
        if (!categorySelect.value && !newCategoryInput.value.trim()) {
            categorySelect.classList.add('is-invalid');
            isValid = false;
        }

        // Validate subcategory (either selected or new)
        if (!subcategorySelect.value && !newSubcategoryInput.value.trim()) {
            subcategorySelect.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    function addNewProduct() {
        // Get form values
        const titleInput = document.getElementById('productTitle');
        const priceInput = document.getElementById('productPrice');
        const descriptionInput = document.getElementById('productDescription');
        const categorySelect = document.getElementById('productCategory');
        const subcategorySelect = document.getElementById('productSubcategory');
        const newCategoryInput = document.getElementById('newCategory');
        const newSubcategoryInput = document.getElementById('newSubcategory');
        const stockInput = document.getElementById('productStock');

        // Get existing products
        let products = getStoredProducts();

        // Generate new ID

        let newId = 0;
        if (products.length > 0) {
            
            products.forEach(product => {
                if (product.id > newId) {
                    newId = product.id;
                }
            });

            newId = newId + 1;
        } else {

            newId = 1;

        }
        // Determine category and subcategory
        const category = newCategoryInput.value.trim() || categorySelect.value;
        const subcategory = newSubcategoryInput.value.trim() || subcategorySelect.value;

        // Create new product
        let newProduct = new Product(
            newId,
            titleInput.value.trim(),
            descriptionInput.value.trim(),
            parseFloat(priceInput.value),
           `https://picsum.photos/200/200?id=${newId}`,
            category,
            subcategory,
            parseInt(stockInput.value) || 10
        );

        // Add to beginning of array
        products.unshift(newProduct);

        // Save to localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Re-render all products
        renderProducts(products);

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
        modal.hide();

        // Reset form
        document.getElementById('addProductForm').reset();

        

        // Show success message
        alert(`Product "${newProduct.title}" added successfully!`);
    }

    function getStoredProducts() {
        let productsInStorage = localStorage.getItem('products');
        return productsInStorage ? JSON.parse(productsInStorage) : [];
    }

}); //we use DOMContentLoaded to ensure the DOM is fully loaded before running the script
