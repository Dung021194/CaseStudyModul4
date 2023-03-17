package com.example.casestudymd4_ecommerce.repository;

import com.example.casestudymd4_ecommerce.model.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IShopRepo extends JpaRepository<Shop,Long> {
    @Query(value = "SELECT s from Shop s where s.user.username like : name")
    Page<Shop> findAllShopByUserName(Pageable pageable, String name);

    @Query(value = "SELECT s from Shop s where s.user.id = :id")
    Shop findShopByUserId(@Param( "id") Long id);
    @Query(value = "SELECT s from Shop s where s.user.status = true")
    Page<Shop> showAllShop(Pageable pageable);
}
