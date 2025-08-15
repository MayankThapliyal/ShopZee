package com.example.ShopZee.service;

import org.springframework.stereotype.Service;

import com.example.ShopZee.bean.UserBean;
import com.example.ShopZee.entity.UserEntity;

@Service
public interface UserService {
	boolean registerUser(UserEntity userEntity);
	UserBean loginUser(String username, String password);
	UserBean getUserById(int userId);
	int getMaxUserId();
	
}

