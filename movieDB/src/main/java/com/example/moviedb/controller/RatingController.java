package com.example.moviedb.controller;

import com.example.moviedb.entity.Account;
import com.example.moviedb.entity.Movie;
import com.example.moviedb.entity.Rating;
import com.example.moviedb.repository.AccountRepository;
import com.example.moviedb.repository.RatingRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin()
@RestController
@RequestMapping("/api/v1/ratings")
public class RatingController {
    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private AccountRepository accountRepository;


    @GetMapping
    public List<Rating> getRatings() {
        return ratingRepository.findAll();
    }

//    @GetMapping("/ratings/{username}")
//    public List<Rating> getUserRatingsByUser(@PathVariable String username) {
//        Optional<Account> accountWithRatings = accountRepository.findByUsername(username);
//        if(accountWithRatings.isPresent()){
//            return accountWithRatings.get().getRatings();
//        }
//        return List.of();
//    }
    @PostMapping("/movies")
    public List<Rating> getRatingsByMovieId(@RequestBody Movie movie){
        return ratingRepository.findByMovieId(movie.getId());
    }

    @PostMapping
    public ResponseEntity<Rating> createRating(@RequestBody Rating rating) {
        Account accountForRating = accountRepository.findAccountByUsername(rating.getAccount().getUsername());
        rating.setAccount(accountForRating);
        if(ratingRepository.findByAccount_IdAndMovie_Id(rating.getAccount().getId(), rating.getMovie().getId()) != null) {
            return ResponseEntity.status(409).build();
        }

        return ResponseEntity.ok(ratingRepository.save(rating));
    }

    @PutMapping("/{id}")
    public Rating updateRating(@PathVariable Long id, @RequestBody Rating rating) {
        Rating existingRating = ratingRepository.findById(id).orElse(null);
        if (existingRating != null) {
            existingRating.setStars(rating.getStars());
            existingRating.setComment(rating.getComment());
            return ratingRepository.save(existingRating);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteRating(@PathVariable Long id) {
        ratingRepository.deleteById(id);
    }
}



