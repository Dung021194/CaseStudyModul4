package com.example.casestudymd4_ecommerce.controller;

import com.example.casestudymd4_ecommerce.model.*;
import com.example.casestudymd4_ecommerce.repository.IProductRepo;
import com.example.casestudymd4_ecommerce.service.IProductService;
import com.example.casestudymd4_ecommerce.service.IShopService;
import com.example.casestudymd4_ecommerce.service.IUserService;
import com.example.casestudymd4_ecommerce.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

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
    @Autowired
    private CategoryServiceImpl categoryService;
    @Autowired
    private VoucherServiceImpl voucherService;
    @Autowired
    private CartServiceImpl cartService;
    @Autowired
    private IProductRepo iProductRepo;

    @GetMapping("/shops/page")
    public ResponseEntity<Page<Shop>> showOwner(@PageableDefault(size = 5)
                                                @SortDefault.SortDefaults({@SortDefault(sort = "user")})
                                                Pageable pageable) {
        Page<Shop> shops = shopService.findAll(pageable);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    @DeleteMapping("/banUser/{id}")
    public ResponseEntity<User> banUser(@PathVariable Long id) {
        User user = userService.findOne(id);
        user.setStatus(false);
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestPart(value = "file", required = false) MultipartFile file,
                                     @RequestPart("product") Product product) {
        product.setImage(file);
        productService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteByQuantity (@PathVariable Long id){
//        Shop shop = shopService.findOne(id);
//        productService.deleteProductByQuantity(shop.getId());
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
    @GetMapping()
    public ResponseEntity<Page<Product>> showShopProduct(@PageableDefault Pageable pageable,HttpServletRequest request){
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        Page<Product> products = productService.findALlProductByShop(pageable,user.getId());
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @GetMapping("/categories")
    public ResponseEntity<Page<Category>> getCategory(@PageableDefault(size = 5) Pageable pageable){
        return new ResponseEntity<>(categoryService.findAll(pageable),HttpStatus.ACCEPTED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> updateForm(@PathVariable Long id){
        Product product = productService.findOne(id);
        return new ResponseEntity<>(product,HttpStatus.OK);

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id){
        productService.delete(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    @GetMapping("/products")
    public ResponseEntity<Page<Product>> findAllProducts(@PageableDefault(size = 5)
                                                         @SortDefault.SortDefaults({@SortDefault(sort = "name", direction = Sort.Direction.ASC)})
                                                         Pageable pageable) {
        Page<Product> products = productService.findAll(pageable);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @PostMapping("/saveVoucher")
    public ResponseEntity<Void> saveVoucher(@RequestBody Voucher voucher,HttpServletRequest request){
        HttpSession session = request.getSession();
        Long id = (Long) session.getAttribute("userId");
        Shop shop = shopService.findShopByUser(id);
        voucher.setShop(shop);
        voucherService.save(voucher);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    @GetMapping("/vouchers")
    public ResponseEntity<List<Voucher>> getVouchers(HttpServletRequest request){
        HttpSession session = request.getSession();
        Long id = (Long) session.getAttribute("userId");
        Shop shop = shopService.findShopByUser(id);
        List<Voucher> voucherList = voucherService.findAllVoucherByShop(shop);
        return new ResponseEntity<>(voucherList,HttpStatus.OK);
    }
    @DeleteMapping("/vouchers/{id}")
    public ResponseEntity<List<Voucher>> deleteVouchers(@PathVariable Long id){
        voucherService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/addToCart/{id}")
    public ResponseEntity<Cart> addToCart(@PathVariable Long id){

        return new ResponseEntity<>(cartService.addProductToCart(id),HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Product>> findByName(@PageableDefault(size = 4) Pageable pageable, String name) {
        Page<Product> products = iProductRepo.findAllByNameContaining(pageable, name);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity<Page<Product>> newProducts(@PageableDefault(size = 4) Pageable pageable) {
        Page<Product> products = iProductRepo.findNewestProducts(PageRequest.of(0, 3));
        return new ResponseEntity<>(products, HttpStatus.FOUND);
    }

    @GetMapping("/cate-names-shirt")
    public ResponseEntity<Page<String>> getProductNamesByCategory(
            @PageableDefault(size = 3, page = 0, sort = "name") Pageable pageable) {
        Page<String> page = iProductRepo.findAllProductNamesByCategory(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/cate-names-accessory")
    public ResponseEntity<Page<String>> getProductNamesByCategory1(
            @PageableDefault(size = 3, page = 0, sort = "name") Pageable pageable) {
        Page<String> page = iProductRepo.findAllProductNamesByCategory(pageable);
        return ResponseEntity.ok(page);
    }
    @GetMapping("/getCheckOutItem")
    public ResponseEntity<Integer> getCheckOutItem(){
        return new ResponseEntity<>(cartService.getQuantityProduct(),HttpStatus.ACCEPTED);
    }
    @GetMapping("mmmm")
    public ResponseEntity<Product> detail(@PathVariable Long id ) {
        Product products =  productService.findOne(id);
        return new ResponseEntity<>(products ,HttpStatus.OK);
    }

    @GetMapping("/user/page")
    public ResponseEntity<Page<User>> findAllUser(@PageableDefault(size = 5)
                                                  @SortDefault.SortDefaults({@SortDefault(sort = "username")})
                                                  Pageable pageable){
        Page<User> users = userService.findAll(pageable);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/categories")
    public ResponseEntity<Void> save(@RequestBody Category category) {
        category.setStatus(true);
        categoryService.save(category);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/categories/page")
    public ResponseEntity<Page<Category>> findAllCategory(@PageableDefault(size = 5)
                                                          @SortDefault.SortDefaults({@SortDefault(sort = "name")})
                                                          Pageable pageable) {
        Page<Category> category = categoryService.findAll(pageable);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void>deleteCategory(@PathVariable Long id){
        Category category = categoryService.findOne(id);
        category.setStatus(false);
        categoryService.save(category);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

