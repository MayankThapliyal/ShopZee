package com.example.ShopZee.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Users")
public class UserEntity {
	@Id
	@Column(name="userId")
	private int userId;
	
	@Column private String username;
	
	@Column private String password;
	
	@Column private String email;
	
	@Column private String phonenumber;

	public UserEntity(int userId, String username, String password, String email, String phonenumber) {
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.email = email;
		this.phonenumber = phonenumber;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}
	
	public UserEntity() {}
	

}
