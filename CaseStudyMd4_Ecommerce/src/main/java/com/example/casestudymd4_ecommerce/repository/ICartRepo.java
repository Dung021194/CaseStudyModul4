package com.example.casestudymd4_ecommerce.repository;

import com.example.casestudymd4_ecommerce.model.Cart;
import com.example.casestudymd4_ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface ICartRepo extends JpaRepository<Cart,Long> {
    void save(Map<Product,Long> cartMap);
}
