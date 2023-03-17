package com.example.casestudymd4_ecommerce.service.impl;

import com.example.casestudymd4_ecommerce.model.Cart;
import com.example.casestudymd4_ecommerce.model.Product;
import com.example.casestudymd4_ecommerce.model.User;
import com.example.casestudymd4_ecommerce.model.Voucher;
import com.example.casestudymd4_ecommerce.repository.ICartRepo;
import com.example.casestudymd4_ecommerce.repository.IProductRepo;
import com.example.casestudymd4_ecommerce.repository.IUserRepo;
import com.example.casestudymd4_ecommerce.repository.IVoucherRepo;
import com.example.casestudymd4_ecommerce.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@Service
public class CartServiceImpl implements ICartService {
    @Autowired
    ICartRepo cartRepo;
    @Autowired
    IUserRepo userRepo;
    @Autowired
    IProductRepo productRepo;
    @Autowired
    IVoucherRepo voucherRepo;
    @Autowired
    private HttpSession httpSession;
    @Autowired
    private UserServiceImpl userService;

    @Override
    public Page<Cart> findAll(Pageable pageable) {
        return cartRepo.findAll(pageable);
    }

    @Override
    public Cart findOne(Long id) {
        return cartRepo.findById(id).orElse(null);
    }

    @Override
    public void save(Cart cart) {
        cartRepo.save(cart);

    }


    @Override
    public void delete(Long id) {
        cartRepo.deleteById(id);

    }


    @Override
    public Cart addProductToCart(Long id) {
        Product product = productRepo.findById(id).orElse(null);
        User user = userService.getCurrentUser();
            Cart cart = findCartByUser(user);
            if (cart == null) {
                cart = new Cart();
                Map<Product, Integer> productMap = new HashMap<>();
                cart.setStatus("pending");
                cart.setUser(user);
                productMap.put(product, 1);
                cart.setProductsMap(productMap);
            } else {
                Map<Product, Integer> productMap = cart.getProductsMap();
                Integer quantity = productMap.get(product);
                if (quantity == null) {
                    productMap.put(product, 1);
                } else {
                    productMap.put(product, (quantity + 1));
                }
            }
            cartRepo.save(cart);
            return cart;
    }


    @Override
    public Cart deleteProductInCart(Long id) {
        Product product = productRepo.findById(id).orElse(null);
        User user = userService.getCurrentUser();
        Cart cart = findCartByUser(user);
        if (cart!=null){
            Map<Product, Integer> productMap = cart.getProductsMap();
            Integer quantity = productMap.get(product);
            if (quantity>1){
                productMap.put(product, (quantity-1));
            }else {
                productMap.remove(product);
            }
            cartRepo.save(cart);
        }
        return null;
    }
    public List<Product> cartReviewPayment(Cart cart){
        List<Product> list = new ArrayList<>();
        Map<Product, Integer> productMap = cart.getProductsMap();
        Set<Product> set = productMap.keySet();
        Long quantity = 0L;
        for (Product p:set){
            quantity = Long.valueOf(productMap.get(p));
            p.setQuantity((Long)quantity);
            list.add(p);
        }
        return list;
    }
    public Cart addVoucher(Voucher voucher,Cart cart){
        Map<Product, Integer> productMap = cart.getProductsMap();
        Set<Product> set = productMap.keySet();
        for (Product p:set){
            if (p.getShop().getId().equals(voucher.getShop().getId()) &&
                    p.getId().equals(voucher.getProduct().getId())){
                p.setPrice(p.getPrice() * (voucher.getPercent()/100) );
                voucherRepo.delete(voucher);
            }
        }
        return cart;
    }

    @Override
    public Cart findCartByUser(User user) {
       return cartRepo.findCartByUser(user);
    }

    public Integer getQuantityProduct(){
        Integer quantity = 0;
        User user = userService.getCurrentUser();
        if (user!=null) {
            Cart cart = findCartByUser(user);
            if (cart.getStatus().equals("pending")) {
                Map<Product, Integer> productsMap = cart.getProductsMap();
                Set<Product> set = productsMap.keySet();
                for (Product p : set) {
                    quantity += productsMap.get(p);
                }
            }
        }
        return quantity;
    }
}

