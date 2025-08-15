package com.example.ShopZee.ui;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ShopZee.entity.OrderEntity;
import com.example.ShopZee.service.OrderService;

@RestController
@CrossOrigin(origins="http://127.0.0.1:5500")
@RequestMapping("/orders")
public class Order {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/place")
	public OrderEntity placeOrder(@RequestBody Map<String,Object> request) {
		String username = (String) request.get("username");
		@SuppressWarnings("unchecked")
		List<String> items = (List<String>) request.get("items");
		double totalAmount = Double.parseDouble(request.get("totalAmount").toString());
		
		return orderService.placeOrder(username, items, totalAmount);
	}
	
	@GetMapping("/{userName}")
	public List<OrderEntity> getUserOrders(@PathVariable String userName){
		return orderService.getOrdersForUser(userName);
	}
}
