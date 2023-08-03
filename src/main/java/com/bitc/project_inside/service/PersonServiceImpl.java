package com.bitc.project_inside.service;

import com.bitc.project_inside.data.DTO.PersonRequest;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
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
