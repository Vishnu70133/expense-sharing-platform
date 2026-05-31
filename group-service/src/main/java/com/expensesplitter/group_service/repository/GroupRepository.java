package com.expensesplitter.group_service.repository;

import com.expensesplitter.group_service.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository
        extends JpaRepository<Group, Long> {
}