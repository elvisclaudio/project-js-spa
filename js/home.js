pageLayout.innerHTML += `<div class="row bg-black my-2" id="my-dynamic-content">

    <div class="col-12 text-center my-2 ">
        <h1 class="text-white">Welcome to Burger King</h1>
        
    </div>

    <div class="col-12 my-3" id="root">
        <div class="row">
            <div class="col-12 text-center">
                <button class="btn btn-primary" id="add-product-button" data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>
            </div>

            <div class="col-12 text-center">
                <button class="btn btn-danger" id="clear-database">Clear Database</button>
            </div>
         
            
        </div>
        <div class="row" id="products-root">
            <!-- This is where the posts will be dynamically inserted -->
        </div>
    </div>
</div>

<!-- Add Product Modal -->
<div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-grey text-white">
                <h5 class="modal-title" id="addProductModalLabel">
                    <i class="fa-solid fa-plus-circle me-2"></i>Add New Product
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="addProductForm">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="productTitle" class="form-label">
                                    <i class="fa-solid fa-tag me-1"></i>Product Title <span class="text-danger">*</span>
                                </label>
                                <input type="text" class="form-control" id="productTitle" name="title" required>
                                <div class="invalid-feedback">Please enter a product title.</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="productPrice" class="form-label">
                                    <i class="fa-solid fa-dollar-sign me-1"></i>Price <span class="text-danger">*</span>
                                </label>
                                <input type="number" class="form-control" id="productPrice" name="price" step="0.01" min="0" required>
                                <div class="invalid-feedback">Please enter a valid price.</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="productDescription" class="form-label">
                            <i class="fa-solid fa-align-left me-1"></i>Description <span class="text-danger">*</span>
                        </label>
                        <textarea class="form-control" id="productDescription" name="description" rows="3" required></textarea>
                        <div class="invalid-feedback">Please enter a product description.</div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="productCategory" class="form-label">
                                    <i class="fa-solid fa-list me-1"></i>Category <span class="text-danger">*</span>
                                </label>
                                <select class="form-select" id="productCategory" name="category" required>
                                    <option value="">Select or add category...</option>
                                </select>
                                <div class="mt-2">
                                    <input type="text" class="form-control form-control-sm" id="newCategory" placeholder="Or type new category...">
                                </div>
                                <div class="invalid-feedback">Please select or enter a category.</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="productSubcategory" class="form-label">
                                    <i class="fa-solid fa-tags me-1"></i>Subcategory <span class="text-danger">*</span>
                                </label>
                                <select class="form-select" id="productSubcategory" name="subcategory" required>
                                    <option value="">Select or add subcategory...</option>
                                </select>
                                <div class="mt-2">
                                    <input type="text" class="form-control form-control-sm" id="newSubcategory" placeholder="Or type new subcategory...">
                                </div>
                                <div class="invalid-feedback">Please select or enter a subcategory.</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
     
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="productStock" class="form-label">
                                    <i class="fa-solid fa-boxes me-1"></i>Stock Quantity
                                </label>
                                <input type="number" class="form-control" id="productStock" name="stock" min="0" value="10">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="fa-solid fa-times me-1"></i>Cancel
                </button>
                <button type="button" class="btn btn-primary" id="saveProductBtn">
                    <i class="fa-solid fa-save me-1"></i>Save Product
                </button>
            </div>
        </div>
    </div>
</div>`;

//home.js will be inserted into the page layout after the header, navbar before the footer