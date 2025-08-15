package com.example.ShopZee.service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.example.ShopZee.entity.OrderEntity;

@Service
public class OrderService {
	private final Map<String, List<OrderEntity>> userOrders = new ConcurrentHashMap<>();
	private static final String ORDER_PREFIX = "ORD";
	private static final SecureRandom random = new SecureRandom();
	
	private synchronized String generateUniqueOrderID() {
		String id;
		do {
			id = ORDER_PREFIX + (100000 + random.nextInt(900000));
		} while( isOrderIdExists(id));
		return id;
	}
	
	private boolean isOrderIdExists(String id) {
		return userOrders.values().stream()
				.flatMap(List::stream)
				.anyMatch(order -> order.getOrderId().equals(id));
	}
	
	public OrderEntity placeOrder(String username, List<String> items, double totalAmount) {
		String orderId = generateUniqueOrderID();
		OrderEntity order = new OrderEntity(orderId, username, items, totalAmount);
		
		userOrders.compute(username, (k,list)->{
			if(list==null) list = new ArrayList<>();
			list.add(order);
			return list;
		});
		
		return order;
	}
	
	public List<OrderEntity> getOrdersForUser(String userName){
		List<OrderEntity> list = userOrders.get(userName);
		return list==null?Collections.emptyList() : Collections.unmodifiableList(new ArrayList<>(list));
	}
}
