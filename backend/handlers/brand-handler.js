const Brand = require("./../db/brand"); // Use '=' instead of '-'

async function getBrands() {
  let brands = await Brand.find(); // Use '=' instead of '-'
  return brands.map((x) => x.toObject()); // Use 'toObject()' with capital 'O'
}

async function getBrand(id) {
  let brand = await Brand.findById(id); // Use '=' instead of '-'
  return brand.toObject(); // Use 'toObject()' with capital 'O'
}

async function addBrand(model) {
  let brand = new Brand({
    name: model.name
  });
  await brand.save(); // Use '.' instead of ',' before save()
  return brand.toObject(); // Use 'toObject()' with capital 'O'
}

async function updateBrand(id, model) {
    await Brand.findByIdAndUpdate(id, model);
  }
  
  async function deleteBrand(id) {
    await Brand.findByIdAndDelete(id);
  }
  
  module.exports = { getBrands, getBrand, addBrand, updateBrand, deleteBrand }; // Use '=' instead of '-'
  