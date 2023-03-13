package com.example.casestudymd4_ecommerce.controller;
import com.example.casestudymd4_ecommerce.model.Product;
import com.example.casestudymd4_ecommerce.model.Shop;
import com.example.casestudymd4_ecommerce.service.IProductService;
import com.example.casestudymd4_ecommerce.service.IShopService;
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

@RestController
@CrossOrigin("*")
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IShopService iShopService;
    @GetMapping("/shops")
    public ResponseEntity <Page<Shop>> showOwner(@PageableDefault(size = 5)
                                                        @SortDefault.SortDefaults({@SortDefault(sort = "name", direction = Sort.Direction.ASC)})
                                                        Pageable pageable){
        Page<Shop> shops = iShopService.findAllPage(pageable,"");
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }
    @PutMapping("/banOwner")
    public ResponseEntity<Shop> banOwner(@PathVariable Long id){
    }
}
