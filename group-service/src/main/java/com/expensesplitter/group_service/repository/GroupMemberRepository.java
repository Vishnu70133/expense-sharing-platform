package com.expensesplitter.group_service.repository;

import com.expensesplitter.group_service.entity.GroupMember;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

public interface GroupMemberRepository
        extends JpaRepository<GroupMember, Long> {

    List<GroupMember> findByUserId(
            Long userId
    );

    List<GroupMember> findByGroupId(
            Long groupId
    );
    boolean existsByGroupIdAndUserId(
        Long groupId,
        Long userId
);
@Modifying
@Transactional
void deleteByGroupId(Long groupId);

Optional<GroupMember> findByGroupIdAndUserId(
        Long groupId,
        Long userId
);

void deleteByGroupIdAndUserId(
        Long groupId,
        Long userId
);
}