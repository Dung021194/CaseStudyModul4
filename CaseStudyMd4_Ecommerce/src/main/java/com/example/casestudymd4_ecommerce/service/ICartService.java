package com.example.casestudymd4_ecommerce.service;


import com.example.casestudymd4_ecommerce.model.Cart;
import com.example.casestudymd4_ecommerce.model.Product;
import com.example.casestudymd4_ecommerce.model.User;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface ICartService extends ICOREService<Cart> {

    Cart addProductToCart(HttpServletRequest request, Long id);
    Cart deleteProductInCart(HttpServletRequest request, Long id);

    Cart findCartByUser(User user);
}
