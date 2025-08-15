package com.example.ShopZee.ui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ShopZee.bean.UserBean;
//import com.example.ShopZee.dao.UserDAO;
import com.example.ShopZee.entity.UserEntity;
import com.example.ShopZee.service.UserService;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/user")
public class User {
	
	@Autowired
	private UserService userService;
	
//	@Autowired
//	private UserDAO userDao;
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody UserEntity userEntity){
		boolean success = userService.registerUser(userEntity);
		if(success) {
			return ResponseEntity.ok("Registration successful!");
		} else {
			return ResponseEntity.badRequest().body("Username already exists");
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserEntity loginRequest){
		UserBean user = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
		if(user!=null) return ResponseEntity.ok(user);
		else return ResponseEntity.status(401).body("Invalid username or password");
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserBean> getUserById(@PathVariable("id") int userId){
		UserBean ub = userService.getUserById(userId);
		if(ub!=null) {
			return ResponseEntity.ok(ub);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}	
