package com.example.casestudymd4_ecommerce.service;

import com.example.casestudymd4_ecommerce.model.Product;
import com.example.casestudymd4_ecommerce.model.Shop;
import com.example.casestudymd4_ecommerce.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IShopService extends ICOREService<Shop>{
    Page<Shop> findAllPage(Pageable pageable, String name);

}
