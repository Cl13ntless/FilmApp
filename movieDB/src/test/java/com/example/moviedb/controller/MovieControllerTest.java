package com.example.moviedb.controller;

import com.example.moviedb.entity.Movie;
import com.example.moviedb.repository.MovieRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MovieControllerTest {

    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private MovieController movieController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllMovies() {
        List<Movie> movieList = new ArrayList<>();
        movieList.add(new Movie(1L, "Test Movie 1", "Test Director 1", 2021));
        movieList.add(new Movie(2L, "Test Movie 2", "Test Director 2", 2022));
        when(movieRepository.findAll()).thenReturn(movieList);

        ResponseEntity<List<Movie>> response = movieController.getAllMovies();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, Objects.requireNonNull(response.getBody()).size());
    }

    @Test
    void testGetMovieById() {
        Movie movie = new Movie(12L, "Test Movie", "Test Director", 2021);
        when(movieRepository.findById(any())).thenReturn(Optional.of(movie));

        ResponseEntity<Movie> response = movieController.getMovieById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(movie, response.getBody());
    }

    @Test
    void testAddMovie() {
        Movie movie = new Movie(12L, "Test Movie", "Test Director", 2021);
        when(movieRepository.save(any())).thenReturn(movie);
        when(movieRepository.findAll()).thenReturn(List.of());

        ResponseEntity<Movie> response = movieController.addMovie(movie);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(movie, response.getBody());
    }

    @Test
    void testAddMovieDuplicate() {
        Movie movie = new Movie(12L, "Test Movie", "Test Director", 2021);
        when(movieRepository.findAll()).thenReturn(List.of(movie));

        ResponseEntity<Movie> response = movieController.addMovie(movie);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        verify(movieRepository, never()).save(any());
    }

    @Test
    void testDeleteMovie() {
        doNothing().when(movieRepository).deleteById(any());

        movieController.deleteMovie(12L);

        verify(movieRepository, times(1)).deleteById(any());
    }

    @Test
    void testUpdateMovie() {
        Movie existingMovie = new Movie(12L, "Test Movie 1", "Test Director 1", 2021);
        Movie updatedMovie = new Movie(12L, "Test Movie 2", "Test Director 2", 2022);
        when(movieRepository.findById(any())).thenReturn(Optional.of(existingMovie));
        when(movieRepository.save(any())).thenReturn(updatedMovie);

        Movie response = movieController.updateMovie(12L, updatedMovie);

        assertEquals(updatedMovie, response);
    }

    @Test
    void testUpdateMovieNotFound() {
        when(movieRepository.findById(any())).thenReturn(Optional.empty());

        Movie response = movieController.updateMovie(12L, new Movie(12L, "Test Movie 1", "Test Director 1", 2021));

        assertNull(response);
    }

}
