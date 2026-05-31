package com.expensesplitter.group_service.controller;

import com.expensesplitter.group_service.dto.AddMemberRequest;
import com.expensesplitter.group_service.dto.CreateGroupRequest;
import com.expensesplitter.group_service.dto.GroupMemberResponse;
import com.expensesplitter.group_service.dto.GroupResponse;
import com.expensesplitter.group_service.dto.UpdateGroupRequest;
import com.expensesplitter.group_service.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public GroupResponse createGroup(
            @Valid
            @RequestBody
            CreateGroupRequest request
    ) {

        return groupService.createGroup(
                request
        );
    }

    @GetMapping("/my-groups")
public List<GroupResponse> getMyGroups() {

    return groupService.getMyGroups();
}

    @GetMapping("/{id}")
public GroupResponse getGroupById(
        @PathVariable Long id
) {

    return groupService.getGroupById(
            id
    );
}

@PostMapping("/{groupId}/members")
public String addMember(
        @PathVariable Long groupId,

        @Valid
        @RequestBody
        AddMemberRequest request
) {

    return groupService.addMember(
            groupId,
            request
    );
}
@GetMapping("/{groupId}/members")
public List<GroupMemberResponse> getMembers(
        @PathVariable Long groupId
) {

    return groupService.getMembers(
            groupId
    );
}

@PutMapping("/{groupId}")
public GroupResponse updateGroup(
        @PathVariable Long groupId,
        @Valid
        @RequestBody
        UpdateGroupRequest request
) {

    return groupService.updateGroup(
            groupId,
            request
    );
}

@DeleteMapping("/{groupId}")
public String deleteGroup(
        @PathVariable Long groupId
) {

    groupService.deleteGroup(
            groupId
    );

    return "Group deleted successfully";
}

}