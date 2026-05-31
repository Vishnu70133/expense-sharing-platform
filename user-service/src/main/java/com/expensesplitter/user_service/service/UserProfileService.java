package com.expensesplitter.user_service.service;

import com.expensesplitter.user_service.dto.CreateProfileRequest;
import com.expensesplitter.user_service.dto.ProfileResponse;
import com.expensesplitter.user_service.dto.UpdateEmailRequest;
import com.expensesplitter.user_service.dto.UpdateProfileRequest;
import com.expensesplitter.user_service.entity.UserProfile;
import com.expensesplitter.user_service.exception.ProfileNotFoundException;
import com.expensesplitter.user_service.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public ProfileResponse createProfile(
            CreateProfileRequest request
    ) {

        UserProfile userProfile =
                UserProfile.builder()
                        .authUserId(request.getAuthUserId())
                        .email(request.getEmail())
                        .fullName(request.getFullName())
                        .phone(request.getPhone())
                        .build();

        UserProfile savedProfile =
                userProfileRepository.save(userProfile);

        return new ProfileResponse(
                savedProfile.getId(),
                savedProfile.getAuthUserId(),
                savedProfile.getEmail(),
                savedProfile.getFullName(),
                savedProfile.getPhone()
        );
    }
    public ProfileResponse getProfileById(Long id) {

    UserProfile profile =
            userProfileRepository.findById(id)
                    .orElseThrow(() ->
                            new ProfileNotFoundException(
                                    "Profile not found with id: " + id
                            )
                    );

    return new ProfileResponse(
            profile.getId(),
            profile.getAuthUserId(),
            profile.getEmail(),
            profile.getFullName(),
            profile.getPhone()
    );
}

public ProfileResponse getProfileByEmail(
        String email
) {

    UserProfile profile =
            userProfileRepository
                    .findByEmail(email)
                    .orElseThrow(() ->
                            new ProfileNotFoundException(
                                    "Profile not found with email: " + email
                            )
                    );

    return new ProfileResponse(
            profile.getId(),
            profile.getAuthUserId(),
            profile.getEmail(),
            profile.getFullName(),
            profile.getPhone()
    );
}
public ProfileResponse getCurrentProfile() {

    String email =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    UserProfile profile =
            userProfileRepository
                    .findByEmail(email)
                    .orElseThrow(() ->
                            new ProfileNotFoundException(
                                    "Profile not found"
                            )
                    );

    return new ProfileResponse(
            profile.getId(),
            profile.getAuthUserId(),
            profile.getEmail(),
            profile.getFullName(),
            profile.getPhone()
    );
}

public ProfileResponse updateCurrentProfile(
        UpdateProfileRequest request
) {

    String email =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    UserProfile profile =
            userProfileRepository
                    .findByEmail(email)
                    .orElseThrow(() ->
                            new ProfileNotFoundException(
                                    "Profile not found"
                            )
                    );

    profile.setFullName(
            request.getFullName()
    );

    profile.setPhone(
            request.getPhone()
    );

    UserProfile updatedProfile =
            userProfileRepository.save(profile);

    return new ProfileResponse(
            updatedProfile.getId(),
            updatedProfile.getAuthUserId(),
            updatedProfile.getEmail(),
            updatedProfile.getFullName(),
            updatedProfile.getPhone()
    );
}
public ProfileResponse getByAuthUserId(
        Long authUserId
) {

    UserProfile profile =
            userProfileRepository
                    .findByAuthUserId(authUserId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "User not found"
                            )
                    );

    return new ProfileResponse(
            profile.getId(),
            profile.getAuthUserId(),
            profile.getEmail(),
            profile.getFullName(),
            profile.getPhone()
    );
}

public void deleteCurrentProfile() {

    String email =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    UserProfile profile =
            userProfileRepository
                    .findByEmail(email)
                    .orElseThrow(() ->
                            new ProfileNotFoundException(
                                    "Profile not found"
                            )
                    );

    userProfileRepository.delete(profile);
}

public void updateEmail(
        UpdateEmailRequest request
) {

    UserProfile profile =
            userProfileRepository
                    .findByEmail(
                            request.getOldEmail()
                    )
                    .orElseThrow(() ->
                            new ProfileNotFoundException(
                                    "Profile not found"
                            )
                    );

    profile.setEmail(
            request.getNewEmail()
    );

    userProfileRepository.save(profile);
}
}