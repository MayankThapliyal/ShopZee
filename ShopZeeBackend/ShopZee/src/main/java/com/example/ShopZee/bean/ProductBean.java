package com.example.ShopZee.bean;

public class ProductBean {
	private int productId;
	private String productName, category, brand;
	private double price;
	
	public ProductBean() {
		
	}

	public ProductBean(int productId, String productName, String category, String brand, double price) {
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

	public void setName(String productName) {
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	
	
	
}
