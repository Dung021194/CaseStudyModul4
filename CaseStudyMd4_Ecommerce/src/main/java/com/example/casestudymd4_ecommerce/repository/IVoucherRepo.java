package com.example.casestudymd4_ecommerce.repository;

import com.example.casestudymd4_ecommerce.model.Shop;
import com.example.casestudymd4_ecommerce.model.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IVoucherRepo extends JpaRepository<Voucher,Long> {
    List<Voucher> findAllByShop(Shop shop);
}
