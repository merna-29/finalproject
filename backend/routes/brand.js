const express = require("express");
const{ addBrand,updateBrand, getBrands, getBrand, deleteBrand} = require("../handlers/brand-handler");
const router = express.Router(); // Use '=' instead of '•'

// POST route for adding a brand
router.post("", async (req, res) => { // Use '.' and '=>' instead of 'post' and '»'
  console.log("here");
  let model = req.body; // Use '.' instead of '-'
  let result = await addBrand(model);
  res.send(result);
});

// PUT route for updating a brand by ID
router.put("/:id", async (req, res) => { // Use '.' and '=>' instead of 'put' and '»>'
  console.log("here");
  let model = req.body; // Use '.' instead of '-'
  let id = req.params["id"]; // Use '.' instead of '-'
  await updateBrand(id, model);
  res.send({message:"updated"});
});

// DELETE route to delete a brand by ID
router.delete("/:id", async (req, res) => {
    console.log("here");
    let id = req.params["id"]; // Use '.' instead of '-'
    await deleteBrand(id);
    res.send({ message: "deleted" });
  });
  
// GET route to get a brand by ID
router.get("/:id", async (req, res) => {
    console.log("here");
    let id = req.params["id"]; // Correct property access
    let brand = await getBrand(id);
    res.send(brand);
  });
  
  // GET route to get all brands
  router.get("", async (req, res) => {
    console.log("here");
    let brands = await getBrands();
    res.send(brands);
  });
  
  module.exports = router;
  
  
