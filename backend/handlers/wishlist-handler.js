const Wishlist = require("./../db/wishlist"); // Fixed path issue

// Add to Wishlist
async function addToWishlist(userId, productId) {
  const wishlist = new Wishlist({
    userId: userId,
    productId: productId,
  });
  await wishlist.save();
  return wishlist.toObject(); // Corrected toObject() method
}

// Remove from Wishlist
async function removeFromWishlist(userId, productId) {
  await Wishlist.deleteMany({
    userId: userId,
    productId: productId,
  });
}

// Get Wishlist for a User
async function getWishlist(userId) {
  let wishlists = await Wishlist.find({ userId: userId }).populate('productId')
  return wishlists.map(x => x.toObject().productId);
}

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
