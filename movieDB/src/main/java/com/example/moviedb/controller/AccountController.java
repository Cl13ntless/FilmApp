package com.example.moviedb.controller;

import com.example.moviedb.entity.Account;
import com.example.moviedb.entity.Rating;
import com.example.moviedb.helper.UserIdAndUsername;
import com.example.moviedb.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin()
@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

    @GetMapping
    public List<UserIdAndUsername> getUsers() {
        return accountRepository.findAllBy();
    }

    @PostMapping
    public Account createUser(@RequestBody Account account) {
        return accountRepository.save(account);
    }

    @PutMapping("/{id}")
    public Account updateUser(@PathVariable Long id, @RequestBody Account account) {
        Account existingAccount = accountRepository.findById(id).orElse(null);
        if (existingAccount != null) {
            existingAccount.setUsername(account.getUsername());
            existingAccount.setPassword(account.getPassword());
            return accountRepository.save(existingAccount);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        accountRepository.deleteById(id);
    }
}
