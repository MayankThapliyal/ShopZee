package com.example.ShopZee.ui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ShopZee.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://127.0.0.1:5500")  // adjust as per your frontend origin
public class AuthController {

    @Autowired
    private UserService userService;

    // Your existing register/login endpoints here

    @GetMapping("/nextUserId")
    public String getNextUserId() {
        int maxId = userService.getMaxUserId();  // You implement this in service layer
        return String.valueOf(maxId + 1);
    }
}
