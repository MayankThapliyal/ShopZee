package com.example.ShopZee.entity;

import jakarta.persistence.*;

@Entity
@Table(name="wishlist", uniqueConstraints = @UniqueConstraint(columnNames = {"userId","productId"}))
public class WishlistEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int wishlistItemId;
	
	@Column(name="userId")
	private int userId;
	
	@Column(name="productId")
	private int productId;

	public int getWishlistItemId() {
		return wishlistItemId;
	}

	public void setWishlistItemId(int wishlistItemId) {
		this.wishlistItemId = wishlistItemId;
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

	
}
