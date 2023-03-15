package com.example.casestudymd4_ecommerce.controller;

import com.example.casestudymd4_ecommerce.model.Product;
import com.example.casestudymd4_ecommerce.model.Shop;
import com.example.casestudymd4_ecommerce.model.User;
import com.example.casestudymd4_ecommerce.service.IProductService;
import com.example.casestudymd4_ecommerce.service.IShopService;
import com.example.casestudymd4_ecommerce.service.IUserService;
import com.example.casestudymd4_ecommerce.service.impl.ProductServiceImpl;
import com.example.casestudymd4_ecommerce.service.impl.ShopServiceImpl;
import com.example.casestudymd4_ecommerce.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private ProductServiceImpl productService;
    @Autowired
    private ShopServiceImpl shopService;

    @GetMapping("/shops")
    public ResponseEntity<Page<Shop>> showOwner(@PageableDefault(size = 6)
                                                @SortDefault.SortDefaults({@SortDefault(sort = "name", direction = Sort.Direction.ASC)})
                                                Pageable pageable) {
        Page<Shop> shops = shopService.findAllPage(pageable, "");
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    @PutMapping("/banUser/{id}")
    public ResponseEntity<User> banUser(@PathVariable Long id) {
        User user = userService.findOne(id);
        user.setStatus(false);
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteByQuantity (@PathVariable Long id){
        Shop shop = shopService.findOne(id);
        productService.deleteProductByQuantity(shop.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<Page<Product>> showShopProduct(@PageableDefault Pageable pageable){
//        HttpSession session = request.getSession();
//        Long id = (Long) session.getAttribute("userId");
        Page<Product> products = productService.findALlProductByShop(pageable,1L);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @GetMapping("/products")
    public ResponseEntity<Page<Product>> findAllProducts(@PageableDefault(size = 5)
                                                         @SortDefault.SortDefaults({@SortDefault(sort = "name", direction = Sort.Direction.ASC)})
                                                         Pageable pageable) {
        Page<Product> products = productService.findAll(pageable);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }

}

