package com.bitc.project_inside.service;

import com.bitc.project_inside.data.DTO.PersonRequest;
import com.bitc.project_inside.data.entity.PersonEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface PersonService {
    PersonEntity getByCredentials(String personId, String personPassword, PasswordEncoder passwordEncoder);

//    int save(PersonRequest dto) throws Exception;

    PersonEntity create(final PersonEntity personEntity) throws Exception;
}
