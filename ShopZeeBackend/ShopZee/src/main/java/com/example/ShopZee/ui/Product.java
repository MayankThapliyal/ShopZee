package com.example.ShopZee.ui;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.ShopZee.bean.FilterRequest;
//import com.example.ShopZee.bean.ProductBean;
import com.example.ShopZee.entity.ProductEntity;
import com.example.ShopZee.service.ProductService;

@RestController
@CrossOrigin(origins="http://127.0.0.1:5500")
public class Product {
	@Autowired
	private ProductService productService;
	
	@GetMapping("/api/products")
	public List<ProductEntity> getProducts(){
		return productService.getAllProducts();
	}
	
	@GetMapping("/api/products/{productId}")
	public ProductEntity getProductById(@PathVariable int productId) {
	    return productService.getProductById(productId);
	}
	
	@PostMapping("/api/products/filter")
	public List<ProductEntity> filterProducts(@RequestBody FilterRequest request){
		return productService.filterProducts(request.getSearch(), request.getCategory());
	}
}
