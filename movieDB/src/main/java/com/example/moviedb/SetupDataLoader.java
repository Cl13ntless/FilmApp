package com.example.moviedb;

import com.example.moviedb.entity.Movie;
import com.example.moviedb.repository.MovieRepository;
import com.univocity.parsers.tsv.TsvParser;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.tomcat.util.http.fileupload.util.mime.RFC2231Utility;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {
    private final MovieRepository movieRepository;
    private boolean alreadySetup = false;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if(movieRepository.findAll().size() > 2 || alreadySetup){
            return;
        }
        insertMoviesFromCSV();
        alreadySetup = false;
    }

    void insertMoviesFromCSV() {
        CSVParser csvParser = null;
        try {
            Reader in = new InputStreamReader(new ClassPathResource("movies_metadata.csv").getInputStream());
            csvParser = new CSVParser(in, CSVFormat.RFC4180.builder()
                    .setHeader("adult", "belongs_to_collection", "budget", "genres", "homepage", "id", "imdb_id ", "original_language", "original_title", "overview", "popularity", "poster_path", "production_companies", "production_countries", "release_date", "revenue", "runtime", "spoken_languages", "status", "tagline", "title", "video", "vote_average", "vote_count")
                    .setAllowMissingColumnNames(true)
                    .setSkipHeaderRecord(true)
                    .build());
        } catch (Exception e1) {
            e1.printStackTrace();
        }

        if (csvParser != null) {
            List<CSVRecord> csvRecords = csvParser.getRecords();
            for (CSVRecord record : csvRecords) {
                // Accessing values by the names assigned to each column

                try {
                    Movie movie = new Movie();
                    movie.setDescription(record.get("overview"));
                    if (record.size() >= csvParser.getHeaderMap().size()) {
                        movie.setTitle(record.get("title"));
                    if (!Objects.equals(record.get("release_date"), "")) {
                        movie.setYear(Integer.parseInt(String.format("%1.4s", record.get("release_date"))));
                    }
                    }
                    movieRepository.save(movie);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

        }
    }
}

