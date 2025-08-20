package com.example.ShopZee.bean;

public class PasswordResetRequest {
	private String username,newPassword;
	
	public PasswordResetRequest() {}

	public PasswordResetRequest(String username, String newPassword) {
		this.username = username;
		this.newPassword = newPassword;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
	
	
	
}
