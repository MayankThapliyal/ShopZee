package com.example.ShopZee.ui;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ShopZee.dao.CartDAO;
import com.example.ShopZee.entity.CartEntity;
import com.example.ShopZee.service.CartService;

@RestController
@CrossOrigin(origins="http://127.0.0.1:5500")
@RequestMapping("/cart")
public class Cart {
    @Autowired
    private CartService cartService;
    
    @Autowired
    private CartDAO cartDao;

    @PostMapping("/add")
    public CartEntity addToCart(@RequestBody CartEntity cartItem) {
        return cartService.addToCart(cartItem.getUserId(), cartItem.getProductId());
    }

    @GetMapping("/{userId}")
    public List<CartEntity> getCartItems(@PathVariable int userId){
        return cartService.getCartByUserId(userId);
    }

    @PutMapping("/update/{cartItemId}")
    public CartEntity updateQuantity(@PathVariable int cartItemId, @RequestParam int quantity) {
    	CartEntity item = cartDao.findById(cartItemId).orElseThrow();
        item.setQuantity(quantity);   // Must update this!
        return cartDao.save(item);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public void removeItem(@PathVariable int cartItemId) {
        cartService.removeFromCart(cartItemId);
    }
    
    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable int userId) {
        cartService.clearCartByUserId(userId);
    }

}
