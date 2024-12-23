const Product = require("../db/product"); // Fixed the import statement

// Function to add a product
async function addProduct(model) {
    let product = new Product({
        ...model,
}); // Create a new Product instance
    await product.save(); // Save the product to the database
    return product.toObject(); // Convert to plain JavaScript object
}

// Function to update a product by ID
async function updateProduct(id, model) {
    await Product.findByIdAndUpdate(id, model); // Find and update the product
}

// Function to delete a product by ID
async function deleteProduct(id) {
    await Product.findByIdAndDelete(id); // Find and delete the product
}

// Function to get all products
async function getAllProducts() {
    let products = await Product.find(); // Find all products
    return products.map((x) => x.toObject()); // Convert each product to a plain object
}

// Function to get a product by ID
async function getProduct(id) {
    let product = await Product.findById(id); // Find the product by ID
    return product.toObject(); // Convert to plain JavaScript object
}


async function getNewProducts() {
    
    // Fetch products where isFeatured is true
    let newProducts = await Product.find({ isNewProduct: true });

    // Return the featured products as plain objects
    return newProducts.map((x) => x.toObject());


}

async function getFeaturedProducts() {
    
        // Fetch products where isFeatured is true
        let featuredProducts = await Product.find({ isFeatured: true });

        // Return the featured products as plain objects
        return featuredProducts.map((x) => x.toObject());

    

}

async function getProductForListing(searchTerm, categoryId, page, pageSize, sortBy, sortorder,brandId) {
    // Set default values for sortBy and sortorder if not provided
    if (!sortBy) {
      sortBy = 'price';
    }
    if (!sortorder) {
      sortorder = -1;
    }
  
    // Initialize query filter
    let queryFilter = {};
    
    // Add searchTerm to query filter if provided
    if (searchTerm) {
        queryFilter.$or=[{
            name: { $regex: searchTerm, $options: 'i' },
         },
        {
            shortDescription: { $regex: searchTerm, $options: 'i' },

        },
    ]; 
    }
    
    // Add categoryId to query filter if provided
    if (categoryId) {
      queryFilter.categoryId = categoryId;
    }
    if (brandId) {
        queryFilter.brandId = brandId;
      }
      console.log("queryFilter",queryFilter);
    // Perform the query with sorting, pagination, and limiting
    const products = await Product.find(queryFilter)
      .sort({ [sortBy]: +sortorder }) // Dynamic sorting
      .skip((+page - 1) * +pageSize)
      .limit(+pageSize);
    
    // Return the products as plain objects
    return products.map(x => x.toObject());
  }
  


module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    getFeaturedProducts,
    getNewProducts,
    getProductForListing 
};
