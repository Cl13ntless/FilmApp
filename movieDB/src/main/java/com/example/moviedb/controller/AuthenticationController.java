package com.example.moviedb.controller;

import com.example.moviedb.auth.AuthenticationRequest;
import com.example.moviedb.auth.AuthenticationResponse;
import com.example.moviedb.auth.AuthenticationService;
import com.example.moviedb.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        AuthenticationResponse response = authenticationService.register(request);
        System.out.println(response);
        if(response.getToken() == null){
            return ResponseEntity.status(409).build();
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate( @RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
