package com.expensesplitter.user_service.controller;

import com.expensesplitter.user_service.dto.CreateProfileRequest;
import com.expensesplitter.user_service.dto.ProfileResponse;
import com.expensesplitter.user_service.dto.UpdateEmailRequest;
import com.expensesplitter.user_service.dto.UpdateProfileRequest;
import com.expensesplitter.user_service.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @PostMapping
    public ProfileResponse createProfile(
            @Valid @RequestBody CreateProfileRequest request
    ) {

        return userProfileService.createProfile(request);
    }
    @GetMapping("/{id}")
public ProfileResponse getProfileById(
        @PathVariable Long id
) {

    return userProfileService
            .getProfileById(id);
}

@GetMapping("/email/{email}")
public ProfileResponse getProfileByEmail(
        @PathVariable String email
) {

    return userProfileService
            .getProfileByEmail(email);
}

@GetMapping("/me")
public ProfileResponse getCurrentProfile() {

    return userProfileService
            .getCurrentProfile();
}

@PutMapping("/me")
public ProfileResponse updateCurrentProfile(
        @Valid
        @RequestBody
        UpdateProfileRequest request
) {

    return userProfileService
            .updateCurrentProfile(request);
}

@GetMapping("/auth-user/{authUserId}")
public ProfileResponse getByAuthUserId(
        @PathVariable Long authUserId
) {

    return userProfileService
            .getByAuthUserId(authUserId);
}

@DeleteMapping("/me")
public String deleteCurrentProfile() {

    userProfileService.deleteCurrentProfile();

    return "Profile deleted successfully";
}
@PutMapping("/internal/email")
public String updateEmail(
        @RequestBody
        UpdateEmailRequest request
) {

    userProfileService.updateEmail(
            request
    );

    return "Email updated";
}
}