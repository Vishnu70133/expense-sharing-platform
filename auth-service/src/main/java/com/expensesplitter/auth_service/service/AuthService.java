package com.expensesplitter.auth_service.service;

import com.expensesplitter.auth_service.client.UserServiceClient;
import com.expensesplitter.auth_service.dto.AuthResponse;
import com.expensesplitter.auth_service.dto.ChangeEmailRequest;
import com.expensesplitter.auth_service.dto.ChangePasswordRequest;
import com.expensesplitter.auth_service.dto.CreateProfileRequest;
import com.expensesplitter.auth_service.dto.LoginRequest;
import com.expensesplitter.auth_service.dto.RegisterRequest;
import com.expensesplitter.auth_service.dto.UpdateEmailRequest;
import com.expensesplitter.auth_service.entity.User;
import com.expensesplitter.auth_service.exception.EmailAlreadyExistsException;
import com.expensesplitter.auth_service.exception.InvalidCredentialsException;
import com.expensesplitter.auth_service.repository.UserRepository;
import com.expensesplitter.auth_service.security.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserServiceClient userServiceClient;

    @Transactional
    public AuthResponse register(RegisterRequest request) {

    if (userRepository.existsByEmail(request.getEmail())) {
        throw new EmailAlreadyExistsException(
                "Email already registered"
        );
    }

    User user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .createdAt(LocalDateTime.now())
            .build();

    User savedUser =
            userRepository.save(user);

    CreateProfileRequest profileRequest =
            new CreateProfileRequest(
                    savedUser.getId(),
                    savedUser.getEmail(),
                    savedUser.getName(),
                    null
            );

    userServiceClient.createProfile(
            profileRequest
    );

    return new AuthResponse(
            "User registered successfully"
    );
}
    public AuthResponse login(
        LoginRequest request
) {

    User user = userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new InvalidCredentialsException(
                            "Invalid email or password"
                    )
            );

    boolean matches =
            passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            );

    if (!matches) {
        throw new InvalidCredentialsException(
                "Invalid email or password"
        );
    }

    String token =
        jwtUtil.generateToken(
                user.getEmail()
        );

return new AuthResponse(token);
}

public void changePassword(
        ChangePasswordRequest request
) {

    String email =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    User user =
            userRepository
                    .findByEmail(email)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "User not found"
                            )
                    );

    if (!passwordEncoder.matches(
            request.getCurrentPassword(),
            user.getPassword()
    )) {

        throw new RuntimeException(
                "Current password is incorrect"
        );
    }

    user.setPassword(
            passwordEncoder.encode(
                    request.getNewPassword()
            )
    );

    userRepository.save(user);
}

public void changeEmail(
        ChangeEmailRequest request
) {

    String currentEmail =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    User user =
            userRepository
                    .findByEmail(currentEmail)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "User not found"
                            )
                    );

    if (userRepository.existsByEmail(
            request.getNewEmail()
    )) {

        throw new RuntimeException(
                "Email already exists"
        );
    }

    user.setEmail(
            request.getNewEmail()
    );

    userRepository.save(user);

    userServiceClient.updateEmail(
            new UpdateEmailRequest(
                    currentEmail,
                    request.getNewEmail()
            )
    );
}

}