package com.example.ShopZee.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ShopZee.dao.ProductDAO;
import com.example.ShopZee.entity.ProductEntity;

@Service
public class ProductService {
	@Autowired
	private ProductDAO productDao;
	
	public List<ProductEntity> getAllProducts(){
		return productDao.findAll();
	}
	
	public ProductEntity getProductById(int productId) {
	    return productDao.findById(productId).orElse(null);
	}
	
	public List<ProductEntity> filterProducts(String search, String category){
		if((search==null||search.isEmpty()) && (category==null||category.isEmpty())) {
			return productDao.findAll();
		}
		
		return productDao.findAll().stream()
				.filter(p->(search == null || p.getProductName().toLowerCase().contains(search.toLowerCase())))
				.filter(p->(category == null || category.isEmpty() || p.getCategory().equalsIgnoreCase(category)))
				.collect(Collectors.toList());
	}
	
}
