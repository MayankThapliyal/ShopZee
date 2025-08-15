package com.example.ShopZee.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ShopZee.entity.WishlistEntity;

public interface WishlistDAO extends JpaRepository<WishlistEntity, Integer>{
	List<WishlistEntity> findByUserId(int userId);
	void deleteByWishlistItemId(int wishlistItemId);
	void deleteByUserIdAndProductId(int userId, int productId);
	boolean existsByUserIdAndProductId(int userId, int productId);
}
