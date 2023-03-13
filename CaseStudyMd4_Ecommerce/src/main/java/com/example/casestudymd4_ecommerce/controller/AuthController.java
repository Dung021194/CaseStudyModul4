package com.example.casestudymd4_ecommerce.controller;

import com.example.casestudymd4_ecommerce.model.User;
import com.example.casestudymd4_ecommerce.security.jwt.JwtResponse;
import com.example.casestudymd4_ecommerce.security.jwt.JwtService;
import com.example.casestudymd4_ecommerce.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User user1 = userService.findByUsername(user.getUsername()).orElse(null);
        if (user1 != null) {
           if (user1.getStatus()) {
               try {
                   Authentication authentication = authenticationManager.authenticate(
                           new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
                   SecurityContextHolder.getContext().setAuthentication(authentication);
                   String jwt = jwtService.generateTokenLogin(authentication);
                   UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                   User currentUser = userService.findByUsername(user.getUsername()).get();
                   return ResponseEntity.ok(new JwtResponse(jwt, currentUser.getId(), userDetails.getUsername(),
                           currentUser.getUsername(), userDetails.getAuthorities()));
               } catch (Exception e) {
                   // Xử lý khi tài khoản không hợp lệ
                   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Invalid username or password\"}");

               }
           }
        }
        return ResponseEntity.status(HttpStatus.LOCKED).body("{\"error\": \"This user has been locked\"}");
    }
    @PostMapping("/register")
    public ResponseEntity<Void> Register(@RequestBody User user){
        if (!userService.checkUsernameExists(user.getUsername())){
            userService.save(user);
        }else {
            return new ResponseEntity<>((HttpStatus.BAD_REQUEST));
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


}
