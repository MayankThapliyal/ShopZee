package com.example.ShopZee.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ShopZee.bean.UserBean;
import com.example.ShopZee.dao.UserDAO;
import com.example.ShopZee.entity.UserEntity;
@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserDAO userDao;
	
//	@Autowired
//	private UserEntity userEntity;

	@Override
	public boolean registerUser(UserEntity userEntity) {
		if (userDao.findByUsername(userEntity.getUsername()).isPresent()) {
			return false;
		}
		userDao.save(userEntity);
		return true;
	}

//	@Override
//	public UserBean loginUser(String username, String password) {
//		Optional<UserEntity> userOpt = userDao.findByUsernameAndPassword(username, password);
//		if(userOpt.isPresent()) {
//			UserEntity userEn = userOpt.get();
//			return new UserBean(userEn.getUserId(), userEn.getUsername(), userEn.getPassword(), userEn.getEmail(), userEn.getPhonenumber());
//		}
//		return null;
//	}
	
	@Override
	public UserBean loginUser(String username, String password) {
	    Optional<UserEntity> userOpt = userDao.findByUsername(username);

	    if (userOpt.isPresent()) {
	        UserEntity user = userOpt.get();

	        if (user.getPassword().equals(password)) {
	            return new UserBean(
	                user.getUserId(),
	                user.getUsername(),
	                user.getPassword(),
	                user.getEmail(),
	                user.getPhonenumber()
	            );
	        }
	    }
	    return null;
	}


	@Override
	public UserBean getUserById(int userId) {
		UserEntity userEn = userDao.findByUserId(userId).orElse(null);
		if(userEn!=null) {
			return new UserBean(userEn.getUserId(), userEn.getUsername(),userEn.getPassword(),userEn.getEmail(), userEn.getPhonenumber());
			
		}
		return null;
	}
	
	public int getMaxUserId() {
        Integer maxId = userDao.findMaxUserId();
        return maxId != null ? maxId : 1000;  // Default start if none present
    }
	
	@Override
	public boolean resetPassword(String username,String password) {
		Optional<UserEntity> userOpt = userDao.findByUsername(username);
		if(userOpt.isPresent()) {
			UserEntity user = userOpt.get();
			user.setPassword(password);
			userDao.save(user);
			return true;
		}
		return false;
	}
}
