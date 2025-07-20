package com.joy.billingApp.controller;

import com.joy.billingApp.io.OrderResponse;
import com.joy.billingApp.io.PaymentRequest;
import com.joy.billingApp.io.PaymentVerificationRequest;
import com.joy.billingApp.io.RazorpayOrderResponse;
import com.joy.billingApp.services.OrderService;
import com.joy.billingApp.services.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException{
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
        return orderService.verifyPayment(request);
    }
}
