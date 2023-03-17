package com.example.casestudymd4_ecommerce.service;


import com.example.casestudymd4_ecommerce.model.Cart;
import com.example.casestudymd4_ecommerce.model.Product;
import com.example.casestudymd4_ecommerce.model.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

public interface ICartService extends ICOREService<Cart> {

    Cart addProductToCart(Long id);

    Cart deleteProductInCart(Long id);

    Cart findCartByUser(User user);
}
