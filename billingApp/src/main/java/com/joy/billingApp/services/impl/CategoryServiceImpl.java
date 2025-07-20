package com.joy.billingApp.services.impl;

import com.joy.billingApp.entity.CategoryEntity;
import com.joy.billingApp.io.CategoryRequest;
import com.joy.billingApp.io.CategoryResponse;
import com.joy.billingApp.repository.CategotyRepository;
import com.joy.billingApp.repository.ItemRepository;
import com.joy.billingApp.services.CategoryService;
import com.joy.billingApp.services.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategotyRepository categotyRepository;
    private final FileUploadService fileUploadService;
    private final ItemRepository itemRepository;
    
    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
        String url = fileUploadService.uploadFile(file);
        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImgUrl(url);
        newCategory = categotyRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categotyRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory = categotyRepository.findByCategoryId(categoryId)
                .orElseThrow(()->new RuntimeException("Category not found : "+categoryId));
        fileUploadService.deleteFile(existingCategory.getImgUrl());
        categotyRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        Integer itemCount = itemRepository.countByCategoryId(newCategory.getId());
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .items(itemCount)
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }
}
