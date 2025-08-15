package com.example.ShopZee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ShopZee.dao.WishlistDAO;
import com.example.ShopZee.entity.WishlistEntity;

@Service
public class WishlistService {
	@Autowired
	private WishlistDAO wishlistDao;
	
	public WishlistEntity addToWishlist(int userId, int productId) {
		if(wishlistDao.existsByUserIdAndProductId(userId, productId)) {
			return null;
		}
		WishlistEntity item = new WishlistEntity();
		item.setUserId(userId);
		item.setProductId(productId);
		return wishlistDao.save(item);
	}
	
	public List<WishlistEntity> getWishlistByUserId(int userId){
		return wishlistDao.findByUserId(userId);
	}
	
	public void removeFromWishlist(int wishlistItemId) {
		wishlistDao.deleteById(wishlistItemId);
	}
	
	public void removeFromWishlistByUserAndProduct(int userId, int productId) {
		wishlistDao.deleteByUserIdAndProductId(userId, productId);
	}
	

}
