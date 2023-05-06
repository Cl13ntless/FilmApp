package com.example.moviedb.controller;

import com.example.moviedb.entity.Account;
import com.example.moviedb.helper.UserIdAndUsername;
import com.example.moviedb.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountControllerTest {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountController accountController;

    @Test
    void testGetUsers() {
        List<UserIdAndUsername> expected = new ArrayList<>();
        when(accountRepository.findAllBy()).thenReturn(expected);

        List<UserIdAndUsername> actual = accountController.getUsers();

        assertEquals(expected, actual);
        verify(accountRepository).findAllBy();
    }

    @Test
    void testCreateUser() {

        Account account = new Account();
        when(accountRepository.save(any(Account.class))).thenReturn(account);

        Account createdAccount = accountController.createUser(account);

        assertEquals(account, createdAccount);
        verify(accountRepository).save(account);
    }

    @Test
    void testUpdateUser() {
        // Arrange
        Long id = 32L;
        Account accountToUpdate = new Account();
        accountToUpdate.setUsername("newUsername");
        accountToUpdate.setPassword("newPassword");
        Account existingAccount = new Account();
        when(accountRepository.findById(id)).thenReturn(Optional.of(existingAccount));
        when(accountRepository.save(existingAccount)).thenReturn(existingAccount);

        // Act
        Account updatedAccount = accountController.updateUser(id, accountToUpdate);

        // Assert
        assertEquals(existingAccount, updatedAccount);
        assertEquals(accountToUpdate.getUsername(), existingAccount.getUsername());
        assertEquals(accountToUpdate.getPassword(), existingAccount.getPassword());
        verify(accountRepository).findById(id);
        verify(accountRepository).save(existingAccount);
    }

    @Test
    void testDeleteUser() {
        // Arrange
        Long id = 32L;

        // Act
        accountController.deleteUser(id);

        // Assert
        verify(accountRepository).deleteById(id);
    }
}
