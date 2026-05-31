package com.expensesplitter.user_service.config;

import com.expensesplitter.user_service.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {
        System.out.println("USER SECURITY CONFIG LOADED");

        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
        .requestMatchers("/profiles/email/**")
        .permitAll()
        .requestMatchers("/profiles/auth-user/**")
        .permitAll()
        .requestMatchers("/profiles")
        .permitAll()
        .requestMatchers(
        "/profiles/internal/**"
)
        .permitAll()
        .requestMatchers(
        "/swagger-ui/**",
        "/swagger-ui.html",
        "/v3/api-docs",
        "/v3/api-docs/**",
        "/swagger-resources/**",
        "/webjars/**"
).permitAll()
        .anyRequest().authenticated()
)

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}