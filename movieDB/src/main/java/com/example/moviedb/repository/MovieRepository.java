package com.example.moviedb.repository;

import com.example.moviedb.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findDistinctByTitleContainsIgnoreCase(String title);
    List<Movie> findDistinctByTitleStartsWith(String title);
    List<Movie> findDistinctByTitleEndsWithIgnoreCase(String title);
}
