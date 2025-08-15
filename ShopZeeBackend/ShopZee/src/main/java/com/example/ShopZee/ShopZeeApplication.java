package com.example.ShopZee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.example.ShopZee")
public class ShopZeeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopZeeApplication.class, args);
	}

}
