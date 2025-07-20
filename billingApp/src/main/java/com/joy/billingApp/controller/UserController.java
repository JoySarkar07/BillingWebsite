package com.joy.billingApp.controller;

import com.joy.billingApp.io.UserRequest;
import com.joy.billingApp.io.UserResponse;
import com.joy.billingApp.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody UserRequest request){
        try{
            return userService.createUser(request);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to create user "+e.getMessage());
        }
    }

    @GetMapping("/users")
    public List<UserResponse> readUsers(){
        return userService.readUsers();
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id){
        try{
            userService.deleteUser(id);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
