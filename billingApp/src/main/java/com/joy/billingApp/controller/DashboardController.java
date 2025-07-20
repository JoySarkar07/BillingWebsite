package com.joy.billingApp.controller;

import com.joy.billingApp.io.DashboardResponse;
import com.joy.billingApp.io.OrderResponse;
import com.joy.billingApp.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderService orderService;

    @GetMapping
    public DashboardResponse getDashboardData(){
        LocalDate today = LocalDate.now();
        Double todaySales = orderService.sumSalesByDate(today);
        Long todayTotalOrders = orderService.countByOrderDate(today);
        List<OrderResponse> recentOrders = orderService.findRecentOrders();

        return new DashboardResponse(
                todaySales != null ? todaySales : 0.0,
                todayTotalOrders != null ? todayTotalOrders : 0,
                recentOrders
        );
    }
}
