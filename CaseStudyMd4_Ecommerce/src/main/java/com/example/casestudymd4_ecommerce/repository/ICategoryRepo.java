package com.example.casestudymd4_ecommerce.repository;

import com.example.casestudymd4_ecommerce.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepo extends JpaRepository<Category,Long> {
    @Query(value = "SELECT c from Category c where c.status=true")
    Page<Category> showAllCategory(Pageable pageable);
}
