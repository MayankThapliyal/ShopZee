package com.example.ShopZee.entity;

import jakarta.persistence.*;

@Entity
@Table(name="cart")
public class CartEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cartItemId")
	private int cartItemId;
	
	@Column(name="userId")
	private int userId;
	
	@Column(name="productId")
	private int productId;
	
	@Column(name="quantity")
	private int quantity;

	public int getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(int cartItemId) {
		this.cartItemId = cartItemId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
}
