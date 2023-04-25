package com.example.moviedb.repository;

import com.example.moviedb.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByMovieId(Long movieId);
    Rating findByAccount_IdAndMovie_Id(Long accountId, Long movieId);
}