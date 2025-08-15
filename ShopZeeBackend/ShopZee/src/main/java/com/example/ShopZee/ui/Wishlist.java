package com.example.ShopZee.ui;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ShopZee.entity.WishlistEntity;
import com.example.ShopZee.service.WishlistService;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/wishlist")
public class Wishlist {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add")
    public WishlistEntity addToWishlist(@RequestBody WishlistEntity wishlistItem) {
        return wishlistService.addToWishlist(wishlistItem.getUserId(), wishlistItem.getProductId());
    }

    @GetMapping("/{userId}")
    public List<WishlistEntity> getWishlistItems(@PathVariable int userId) {
        return wishlistService.getWishlistByUserId(userId);
    }

    @DeleteMapping("/remove/{wishlistItemId}")
    public void removeItem(@PathVariable int wishlistItemId) {
        wishlistService.removeFromWishlist(wishlistItemId);
    }
}
