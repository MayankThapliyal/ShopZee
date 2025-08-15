package com.example.ShopZee.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.ShopZee.entity.ProductEntity;

@Repository
@EnableJpaRepositories
public interface ProductDAO extends JpaRepository<ProductEntity, Integer>{
	
}
