package com.example.casestudymd4_ecommerce.service.impl;

import com.example.casestudymd4_ecommerce.model.Role;
import com.example.casestudymd4_ecommerce.model.User;
import com.example.casestudymd4_ecommerce.model.UserPrinciple;
import com.example.casestudymd4_ecommerce.repository.IUserRepo;
import com.example.casestudymd4_ecommerce.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements IUserService, UserDetailsService {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    IUserRepo userRepo;
    @Autowired
    RoleServiceImpl roleService;

    @Override
    public User findOne(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Set<Role> set = new HashSet<>();
        set.add(roleService.findOne(2L));
        user.setRoles(set);
        user.setStatus(true);
        userRepo.save(user);
    }

    @Override
    public void delete(Long id) {
        userRepo.deleteById(id);

    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepo.findAll(pageable);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public Boolean checkUsernameExists(String name) {
        List<User> list = userRepo.findAll();
        for (User u:list) {
            if (u.getUsername().equals(name)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepo.findByUsername(username);
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException(username);
        }
        return UserPrinciple.build(userOptional.get());
    }
    public User getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return  findByUsername(currentPrincipalName).orElse(null);
    }

}
