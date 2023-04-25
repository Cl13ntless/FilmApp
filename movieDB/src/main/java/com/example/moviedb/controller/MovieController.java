package com.example.moviedb.controller;

import com.example.moviedb.entity.Movie;
import com.example.moviedb.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;

import static org.springframework.http.ResponseEntity.status;

@CrossOrigin()
@RestController
@RequestMapping("/api/v1/movies")
@RequiredArgsConstructor
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @PostMapping("/contains")
    public ResponseEntity<List<Movie>> getMovieContaining(@RequestBody String contains){

        List<Movie> startWithList = movieRepository.findDistinctByTitleStartsWith(contains.toUpperCase());
        List<Movie> endsWithList = movieRepository.findDistinctByTitleEndsWithIgnoreCase(contains);
        List<Movie> containsList = movieRepository.findDistinctByTitleContainsIgnoreCase(contains);
        List<Movie> responseList = Stream.concat(startWithList.stream(), endsWithList.stream()).toList();
        List<Movie> fullResponseList = Stream.concat(responseList.stream(), containsList.stream()).toList();
        return ResponseEntity.ok(movieRepository.findDistinctByTitleContainsIgnoreCase(contains));
    }


    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieRepository.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(movieRepository.findById(id).orElse(null));
    }

    @PostMapping
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        List<String> movieNames = movieRepository.findAll().stream().map(Movie::getTitle).toList();
        if(movieNames.contains(movie.getTitle())){
            return ResponseEntity.status(409).build();
        }
        return ResponseEntity.ok(movieRepository.save(movie));
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        Movie existingMovie = movieRepository.findById(id).orElse(null);
        if (existingMovie != null) {
            existingMovie.setTitle(movie.getTitle());
            existingMovie.setDirector(movie.getDirector());
            existingMovie.setYear(movie.getYear());
            return movieRepository.save(existingMovie);
        }
        return null;
    }

}
