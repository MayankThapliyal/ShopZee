package com.example.ShopZee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ShopZee.dao.CartDAO;
import com.example.ShopZee.entity.CartEntity;

import jakarta.transaction.Transactional;

@Service
public class CartService {
	@Autowired
	private CartDAO cartDao;
	
	public CartEntity addToCart(Integer userId, Integer productId) {
        return cartDao.findByUserIdAndProductId(userId, productId)
                .map(cartItem -> {
                    cartItem.setQuantity(cartItem.getQuantity() + 1);
                    return cartDao.save(cartItem);
                })
                .orElseGet(() -> {
                    CartEntity newItem = new CartEntity();
                    newItem.setUserId(userId);
                    newItem.setProductId(productId);
                    newItem.setQuantity(1);
                    return cartDao.save(newItem);
                });
    }
	
	public List<CartEntity> getCartByUserId(Integer userId) {
        return cartDao.findByUserId(userId);
    }
	
	public CartEntity updateQuantity(int cartItemId, int quantity) {
		CartEntity item = cartDao.findById(cartItemId).orElseThrow();
		return cartDao.save(item);
	}
	
	public void removeFromCart(int cartItemId) {
		cartDao.deleteById(cartItemId);
	}
	
	@Transactional
	public void clearCartByUserId(int userId) {
	    cartDao.deleteByUserId(userId);
	}

}
