package com.example.casestudymd4_ecommerce.controller;

import com.example.casestudymd4_ecommerce.model.Role;
import com.example.casestudymd4_ecommerce.model.User;
import com.example.casestudymd4_ecommerce.security.jwt.JwtResponse;
import com.example.casestudymd4_ecommerce.security.jwt.JwtService;
import com.example.casestudymd4_ecommerce.service.IRoleService;
import com.example.casestudymd4_ecommerce.service.IUserService;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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
    @Autowired
    private IUserService iUserService;
    @Autowired
    private IRoleService iRoleService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletRequest request) {
        User user1 = userService.findByUsername(user.getUsername()).orElse(null);
        HttpSession session = request.getSession();
        if (user1 != null) {
           if (user1.getStatus()) {
               try {
                   session.setAttribute("usernameDisplay",user1.getUsername());
                   session.setAttribute("userId",user1.getId());
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
                   return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid username or password\"}");
               }
           }
            return ResponseEntity.status(HttpStatus.LOCKED).body("{\"error\": \"This user has been locked\"}");
        }
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("{\"error\": \"Error, please try again \"}");
    }
    @PostMapping("/register")
    public ResponseEntity<Void> Register(@RequestBody User user, @RequestParam(value = "role", required = false) String roleIdStr) {
        if (!userService.checkUsernameExists(user.getUsername())) {
            if (roleIdStr != null) {
               userService.save(user);
            }
            Set<Role> roles = new HashSet<>();
            Role role = null;
            Long roleId = null;
                roleId = 3L;
            role = iRoleService.findOne(roleId);
            roles.add(role);
            user.setRoles(roles);
            userService.save(user);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>((HttpStatus.BAD_REQUEST));
        }
    }

    @PostMapping("logout")
    public ResponseEntity<Void> logout(@RequestBody User user) {
        SecurityContextHolder.clearContext();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        authentication.setAuthenticated(false);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
