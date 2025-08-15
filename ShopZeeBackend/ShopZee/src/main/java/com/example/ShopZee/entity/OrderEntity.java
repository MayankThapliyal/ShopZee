package com.example.ShopZee.entity;

import java.util.List;

public class OrderEntity {
	private String orderId, userName;
	private List<String> items;
	private double totalAmount;
	
	public OrderEntity() {}

	public OrderEntity(String orderId, String userName, List<String> items, double totalAmount) {
		this.orderId = orderId;
		this.userName = userName;
		this.items = items;
		this.totalAmount = totalAmount;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public List<String> getItems() {
		return items;
	}

	public void setItems(List<String> items) {
		this.items = items;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
	
		
	
	
	
}
