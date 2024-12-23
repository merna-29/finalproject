const express = require("express"); // Fixed the assignment operator
const { addProduct, getAllProducts, getProduct, deleteProduct, updateProduct } = require("../handlers/product-handler"); // Corrected the import syntax
const router = express.Router(); // Initialize the router

// Route to add a product
router.post("/", async (req, res) => {
  let model = req.body; // Get the product data from the request body
  let product = await addProduct(model); // Call the addProduct function
  res.send(product); // Send the newly created product back as a response
});

router.put("/:id", async (req, res) => {
  let model = req.body;  // Extract product data from request body
  let id = req.params["id"];  // Extract product ID from route parameters
  await updateProduct(id, model);  // Call update function
  res.send({ message: "updated" });  // Send success response
});

// Delete product by ID
router.delete("/:id", async (req, res) => {
  let id = req.params["id"];  // Extract product ID from route parameters
  await deleteProduct(id);  // Call delete function
  res.send({ message: "deleted" });  // Send success response
});

// Get product by ID
router.get("/:id", async (req, res) => {
  let id = req.params.id;  // Extract product ID from route parameters
  let product = await getProduct(id);  // Call get function
  res.send(product);  // Send product data
});

// Get all products
router.get("/", async (req, res) => {
  let products = await getAllProducts();  // Call function to get all products
  res.send(products);  // Send product data
});

module.exports = router; // Export the router
