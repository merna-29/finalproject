const Cart = require("./../db/cart")

// Add to Cart
async function addToCart(userId, productId, quantity) {
 
    // Check if the product already exists in the user's cart
    let product = await Cart.findOne({ userId: userId, productId: productId });

    if (product) {
      if(product.quantity + quantity <= 0){
        await removeFromCart(userId,productId)
      }else{
        await Cart.findByIdAndUpdate(product._id, {
          quantity: product.quantity + quantity,
        });
      }
      // Update the quantity if the product already exists
      
    } else {
      // Add a new product to the cart
       product = new Cart({
        userId: userId,
        productId: productId,
        quantity: quantity,
      });
      await product.save();
    }
  
}

// Remove from Cart
async function removeFromCart(userId, productId) {
 
    await Cart.findOneAndDelete({ userId: userId, productId: productId });
  
}

// Get Cart
async function getCartItems(userId) {
  
    const products = await Cart.find({ userId: userId }).populate("productId");
    return products.map((x)=>{
      return {quantity: x.quantity,product: x.productId};
    });
}
async function clearCart(userId){
  await Cart.deleteMany({
    userId: userId,
  });
}


module.exports = {
  addToCart,
  removeFromCart,
  getCartItems,
  clearCart
};
