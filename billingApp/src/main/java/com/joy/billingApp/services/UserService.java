package com.joy.billingApp.services;

import com.joy.billingApp.io.UserRequest;
import com.joy.billingApp.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
