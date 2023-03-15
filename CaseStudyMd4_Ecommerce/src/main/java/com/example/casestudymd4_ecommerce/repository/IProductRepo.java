package com.example.casestudymd4_ecommerce.repository;

import com.example.casestudymd4_ecommerce.model.Product;
import com.example.casestudymd4_ecommerce.model.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepo extends JpaRepository<Product,Long> {

    Page<Product> findAllByNameContaining(Pageable pageable, String name);
    @Query(value = "SELECT p from Product p where p.shop.id = :id")
    Page<Product> findAllProductByShop(@Param( "id") Pageable pageable, Long id);
    @Query(value = "delete from Product p where p.quantity = :id and p.quantity = 0")
    void deleteProductByQuantity(@Param( "id")Long id);
}
