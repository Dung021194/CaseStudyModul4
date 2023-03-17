package com.example.casestudymd4_ecommerce.repository;

import com.example.casestudymd4_ecommerce.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepo extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    @Query(value = "SELECT u from User u where u.status=true")
    Page<User> showAllUser(Pageable pageable);
}
