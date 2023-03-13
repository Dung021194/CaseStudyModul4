package com.example.casestudymd4_ecommerce.repository;

import com.example.casestudymd4_ecommerce.model.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IShopRepo extends JpaRepository<Shop,Long> {
    Page<Shop> findAllPage(Pageable pageable, String name);
}
