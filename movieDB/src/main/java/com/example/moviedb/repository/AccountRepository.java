package com.example.moviedb.repository;

import com.example.moviedb.entity.Account;
import com.example.moviedb.helper.UserIdAndUsername;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long>{
    Optional<Account> findByUsername(String username);

    Account findAccountByUsername(String username);

    List<UserIdAndUsername> findAllBy();

}
