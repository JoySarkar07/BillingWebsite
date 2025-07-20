package com.joy.billingApp.repository;

import com.joy.billingApp.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategotyRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByCategoryId(String categoryId);
}
