package com.example.ShopZee.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name="Products")
public class ProductEntity {
	@Id
	@Column(name="productId")
	private int productId;
	
	@Column(name="productName")
	private String productName;
	
	@Column(name="category")
	private String category;
	
	@Column(name="brand")
	private String brand;
	
	@Column(name="price")
	private BigDecimal price;
	
	public ProductEntity() {}

	public ProductEntity(int productId, String productName, String category, String brand, BigDecimal price) {
		this.productId = productId;
		this.productName = productName;
		this.category = category;
		this.brand = brand;
		this.price = price;
	}

	public int getProductId() {
		return productId;
	}

	public void setProdId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setproductName(String productName) {
		this.productName = productName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
}
