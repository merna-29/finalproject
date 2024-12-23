const express = require("express");
const {
    getNewProducts,
    getFeaturedProducts,
    getProductForListing,
    getProduct,
    
} = require("../handlers/product-handler"); // Ensure this path is correct

const {getCategories} = require("../handlers/category-handler");
const { getCartItems,addToCart,removeFromCart,clearCart } = require("../handlers/shopping-cart-handler");

const { getBrands } = require("../handlers/brand-handler");
const { getWishlist, addToWishlist,removeFromWishlist} = require("../handlers/wishlist-handler");
const { addOrder,getCustomerOrders} = require("../handlers/order-handler");


const router = express.Router(); // Corrected to use parentheses

// Route to get new products
router.get("/new-products", async (req, res) => { // Corrected parameter name from 'reg' to 'req'
    
        const products = await getNewProducts();
        res.send(products);
    
});

// Route to get featured products
router.get("/featured-products", async (req, res) => { // Corrected parameter name from 'rea' to 'req'
    
        const products = await getFeaturedProducts();
        res.send(products);
    
});

router.get("/categories", async (req, res) => { // Corrected parameter name from 'rea' to 'req'
    
        const categories = await getCategories();
        res.send(categories);
    
});
router.get("/brands", async (req, res) => { // Corrected parameter name from 'rea' to 'req'
    
        const brands = await getBrands();
        res.send(brands);
    
});

router.get("/products", async (req, res) => { 
        const { searchTerm, categoryId, sortBy, sortOrder, brandId, page = 1, pageSize = 10 } = req.query;
    
        // Ensure page and pageSize are numbers
        const pageNumber = parseInt(page, 10) || 1;
        const pageSizeNumber = parseInt(pageSize, 10) || 10;
        const sortOrderNumber = parseInt(sortOrder, 10) || -1; // Convert to a number for sorting
      
        const products = await getProductForListing(
          searchTerm, 
          categoryId, 
          pageNumber, 
          pageSizeNumber, 
          sortBy, 
          sortOrderNumber, 
          brandId
        );
        
        res.send(products);
    });
    
    router.get("/product/:id", async (req, res) => { // Corrected parameter name from 'rea' to 'req'
        const id = req.params["id"];
        const product = await getProduct(id);
        res.send(product);
    
});

router.get("/wishlists",async(req,res)=>{
        console.log(req.user);
        const userId= req.user.id;
        const items=  await getWishlist(userId);
        res.send(items);
})
router.post("/wishlists/:id",async(req,res)=>{
        console.log(req.user);
        const userId= req.user.id;
        const productId= req.params.id;
        const item=  await addToWishlist(userId,productId);
        res.send(item);
})
router.delete("/wishlists/:id",async(req,res)=>{
        console.log(req.user);
        const userId= req.user.id;
        const productId= req.params.id;
         await removeFromWishlist(userId,productId);
        res.send({message:"ok"});
})

router.get("/carts",async(req,res)=>{
        console.log(req.user);
        const userId= req.user.id;
        const items=  await getCartItems(userId);
        res.send(items);
})
router.post("/carts/:id", async (req,res)=>{
        console.log(req.user);
        const userId=req.user.id;
        const productId= req.params.id;
        const quantity= req.body.quantity;

        const items=await addToCart(userId,productId,quantity);
        res.send(items);
});
router.delete("/carts/:id", async (req,res)=>{
        console.log(req.user);
        const userId=req.user.id;
        const productId= req.params.id;
        const items=await removeFromCart(userId,productId);
        res.send(items);
});


router.post("/order", async (req, res) => {
       
          const userId = req.user.id;
          const order = req.body;
          await addOrder(userId, order);
          await clearCart(userId);
          return res.send({ message: "Order Created" });
        
      });

      router.get("/orders",async(req,res)=>{
        
        const userId= req.user.id;
        const orders=  await getCustomerOrders(userId);
        return res.send(orders);
})
      
      module.exports = router;
      
