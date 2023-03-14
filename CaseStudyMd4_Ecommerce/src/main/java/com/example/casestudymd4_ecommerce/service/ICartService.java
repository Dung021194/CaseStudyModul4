package com.example.casestudymd4_ecommerce.service;


import com.example.casestudymd4_ecommerce.model.Cart;
import com.example.casestudymd4_ecommerce.model.Product;

import java.util.Map;

public interface ICartService extends ICOREService<Cart> {
    void saveCartMap(Map<Product,Long> cartMap);
}
