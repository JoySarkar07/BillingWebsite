package com.joy.billingApp.services;

import com.joy.billingApp.io.CategoryRequest;
import com.joy.billingApp.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> read();

    public void delete(String categoryId);
}
