package com.example.moviedb.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.util.Set;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Lob
    private String description;
    private String director;
    private int year;
    @ManyToMany
    private Set<Account> accounts;

//    @OneToMany(mappedBy = "movie")
//    private Set<Rating> ratings;

    public Movie() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<Account> accounts) {
        this.accounts = accounts;
    }

//    public Set<Rating> getRatings() {
//        return ratings;
//    }
//
//    public void setRatings(Set<Rating> ratings) {
//        this.ratings = ratings;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}