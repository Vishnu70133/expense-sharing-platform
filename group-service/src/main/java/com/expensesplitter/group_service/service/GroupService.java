package com.expensesplitter.group_service.service;
import com.expensesplitter.group_service.client.ExpenseServiceClient;
import com.expensesplitter.group_service.client.UserServiceClient;
import com.expensesplitter.group_service.dto.AddMemberRequest;
import com.expensesplitter.group_service.dto.CreateGroupRequest;
import com.expensesplitter.group_service.dto.GroupMemberResponse;
import com.expensesplitter.group_service.dto.GroupResponse;
import com.expensesplitter.group_service.dto.UpdateGroupRequest;
import com.expensesplitter.group_service.dto.UserProfileResponse;
import com.expensesplitter.group_service.entity.Group;
import com.expensesplitter.group_service.entity.GroupMember;
import com.expensesplitter.group_service.exception.GroupNotFoundException;
import com.expensesplitter.group_service.exception.MemberAlreadyExistsException;
import com.expensesplitter.group_service.exception.MemberHasExpenseHistoryException;
import com.expensesplitter.group_service.exception.PendingBalanceException;
import com.expensesplitter.group_service.repository.GroupMemberRepository;
import com.expensesplitter.group_service.repository.GroupRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final UserServiceClient userServiceClient;
    private final ExpenseServiceClient expenseServiceClient;

    public GroupResponse createGroup(
            CreateGroupRequest request
    ) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        

        /*
         * Temporary solution:
         * We'll replace this later with
         * actual userId from User Service.
         */
        UserProfileResponse profile =
        userServiceClient
                .getProfileByEmail(email);

Long userId =
        profile.getAuthUserId();



        Group group = Group.builder()
                .name(request.getName())
                .createdBy(userId)
                .createdAt(LocalDateTime.now())
                .build();

        Group savedGroup =
                groupRepository.save(group);

        GroupMember groupMember =
                GroupMember.builder()
                        .groupId(savedGroup.getId())
                        .userId(userId)
                        .joinedAt(LocalDateTime.now())
                        .build();

        groupMemberRepository.save(
                groupMember
        );

        return new GroupResponse(
                savedGroup.getId(),
                savedGroup.getName(),
                savedGroup.getCreatedBy()
        );
    }

    public GroupResponse getGroupById(
        Long id
) {

    Group group =
            groupRepository
                    .findById(id)
                    .orElseThrow(() ->
                            new GroupNotFoundException(
                                    "Group not found"
                            )
                    );

    return new GroupResponse(
            group.getId(),
            group.getName(),
            group.getCreatedBy()
    );
}

public List<GroupResponse> getMyGroups() {

    String email =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    

    UserProfileResponse profile =
            userServiceClient
                    .getProfileByEmail(email);

    Long userId =
            profile.getAuthUserId();

    

    List<GroupMember> memberships =
            groupMemberRepository
                    .findByUserId(userId);

    return memberships.stream()
            .map(member -> {

                Group group =
                        groupRepository
                                .findById(
                                        member.getGroupId()
                                )
                                .orElseThrow(() ->
                                        new GroupNotFoundException(
                                                "Group not found"
                                        )
                                );

                return new GroupResponse(
                        group.getId(),
                        group.getName(),
                        group.getCreatedBy()
                );

            })
            .toList();
}

public String addMember(
        Long groupId,
        AddMemberRequest request
) {

    Group group =
            groupRepository.findById(groupId)
                    .orElseThrow(() ->
                            new GroupNotFoundException(
                                    "Group not found"
                            )
                    );

    UserProfileResponse profile =
            userServiceClient
                    .getProfileByEmail(
                            request.getEmail()
                    );

    Long userId =
            profile.getAuthUserId();

    boolean alreadyExists =
            groupMemberRepository
                    .existsByGroupIdAndUserId(
                            groupId,
                            userId
                    );

    if (alreadyExists) {

        throw new MemberAlreadyExistsException(
                "User already in group"
        );
    }

    GroupMember member =
            GroupMember.builder()
                    .groupId(group.getId())
                    .userId(userId)
                    .joinedAt(LocalDateTime.now())
                    .build();

    groupMemberRepository.save(
            member
    );

    return "Member added successfully";
}

public List<GroupMemberResponse> getMembers(
        Long groupId
) {

    List<GroupMember> members =
            groupMemberRepository
                    .findByGroupId(groupId);

    return members.stream()
            .map(member -> {

                UserProfileResponse profile =
                        userServiceClient
                                .getProfileByAuthUserId(
                                        member.getUserId()
                                );

                return new GroupMemberResponse(
                        profile.getAuthUserId(),
                        profile.getEmail(),
                        profile.getFullName()
                );

            })
            .toList();
}

public GroupResponse updateGroup(
        Long groupId,
        UpdateGroupRequest request
) {

    Group group =
            groupRepository
                    .findById(groupId)
                    .orElseThrow(() ->
                            new GroupNotFoundException(
                                    "Group not found with id: " + groupId
                            )
                    );

    String email =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    UserProfileResponse profile =
            userServiceClient
                    .getProfileByEmail(email);

    if (!group.getCreatedBy()
            .equals(profile.getAuthUserId())) {

        throw new RuntimeException(
                "Only group creator can update group"
        );
    }

    group.setName(
            request.getName()
    );

    Group updatedGroup =
            groupRepository.save(group);

    return new GroupResponse(
            updatedGroup.getId(),
            updatedGroup.getName(),
            updatedGroup.getCreatedBy()
    );
}
@Transactional
public void deleteGroup(
        Long groupId
) {

    Group group =
            groupRepository
                    .findById(groupId)
                    .orElseThrow(() ->
                            new GroupNotFoundException(
                                    "Group not found with id: " + groupId
                            )
                    );

    String email =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    UserProfileResponse profile =
            userServiceClient
                    .getProfileByEmail(email);

    if (!group.getCreatedBy()
            .equals(profile.getAuthUserId())) {

        throw new RuntimeException(
                "Only group creator can delete group"
        );
    }

    groupMemberRepository
            .deleteByGroupId(groupId);

    groupRepository
            .delete(group);
}

@Transactional
public String leaveGroup(
        Long groupId
) {

    Group group =
            groupRepository.findById(groupId)
                    .orElseThrow(() ->
                            new GroupNotFoundException(
                                    "Group not found"
                            )
                    );

    String email =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    UserProfileResponse profile =
            userServiceClient
                    .getProfileByEmail(email);

    Long userId =
            profile.getAuthUserId();

    if (group.getCreatedBy().equals(userId)) {

        throw new RuntimeException(
                "Group owner cannot leave the group"
        );
    }

    GroupMember member =
            groupMemberRepository
                    .findByGroupIdAndUserId(
                            groupId,
                            userId
                    )
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Member not found"
                            )
                    );

    Double balance =
            expenseServiceClient
                    .getMemberBalance(
                            groupId,
                            userId
                    );

    if (Math.abs(balance) > 0.01) {

        throw new PendingBalanceException(
                "Cannot leave group with pending balance."
        );
    }

    boolean hasExpenses =
            expenseServiceClient
                    .hasExpenseHistory(
                            groupId,
                            userId
                    );

    if (hasExpenses) {

        throw new MemberHasExpenseHistoryException(
                "Cannot leave group because you have expense history."
        );
    }

    groupMemberRepository.delete(member);

    return "Left group successfully";
}
@Transactional
public String removeMember(
        Long groupId,
        Long memberId
) {

    Group group =
            groupRepository.findById(groupId)
                    .orElseThrow(() ->
                            new GroupNotFoundException(
                                    "Group not found"
                            )
                    );

    String email =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

    UserProfileResponse profile =
            userServiceClient
                    .getProfileByEmail(email);

    Long currentUserId =
            profile.getAuthUserId();

    if (!group.getCreatedBy()
            .equals(currentUserId)) {

        throw new RuntimeException(
                "Only group owner can remove members"
        );
    }

    if (memberId.equals(
            group.getCreatedBy()
    )) {

        throw new RuntimeException(
                "Owner cannot be removed"
        );
    }

    GroupMember member =
            groupMemberRepository
                    .findByGroupIdAndUserId(
                            groupId,
                            memberId
                    )
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Member not found"
                            )
                    );

    Double balance =
            expenseServiceClient
                    .getMemberBalance(
                            groupId,
                            memberId
                    );

    if (Math.abs(balance) > 0.01) {

        throw new PendingBalanceException(
                "Member has pending balance. Settle expenses first."
        );
    }

    boolean hasExpenses =
            expenseServiceClient
                    .hasExpenseHistory(
                            groupId,
                            memberId
                    );

    if (hasExpenses) {

        throw new MemberHasExpenseHistoryException(
                "Member has expense history and cannot be removed."
        );
    }

    groupMemberRepository.delete(member);

    return "Member removed successfully";
}
}