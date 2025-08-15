package com.example.ShopZee.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.ShopZee.entity.UserEntity;

@Repository
@EnableJpaRepositories
public interface UserDAO  extends JpaRepository<UserEntity, Integer>{
	Optional<UserEntity> findByUsername(String username);
	Optional<UserEntity> findByEmail(String email);
	Optional<UserEntity> findByUsernameAndPassword(String username, String password);
	Optional<UserEntity> findByUserId(int userId);
	
	  @Query("SELECT MAX(u.userId) FROM UserEntity u")
	    Integer findMaxUserId();
}
