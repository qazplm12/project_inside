package com.bitc.project_inside.service;

import com.bitc.project_inside.data.DTO.PersonRequest;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService{

    private final PersonRepository personRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public int save(PersonRequest dto) {
        return personRepository.save(PersonEntity.builder()
                .personId(dto.getPersonId())
                .personPassword(bCryptPasswordEncoder.encode(dto.getPersonPassword()))
                .build()).getPersonIdx();
    }


}
