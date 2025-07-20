package com.joy.billingApp.services;

import com.joy.billingApp.io.OrderRequest;
import com.joy.billingApp.io.OrderResponse;
import com.joy.billingApp.io.PaymentVerificationRequest;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();
}
