package com.example.ShopZee.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ShopZee.entity.CartEntity;

@Repository
public interface CartDAO extends JpaRepository<CartEntity, Integer>{
	Optional<CartEntity> findByUserIdAndProductId(int userId, int productId);
	List<CartEntity> findByUserId(int userId);
	void deleteByUserId(int userId);

}
