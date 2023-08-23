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
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;

//    @Override
//    public int save(PersonRequest dto) {
//        return personRepository.save(PersonEntity.builder()
//                .personId(dto.getPersonId())
//                .personPassword(bCryptPasswordEncoder.encode(dto.getPersonPassword()))
//                .build()).getPersonIdx();
//    }

    @Override
    public PersonEntity create(final PersonEntity personEntity) throws Exception {
        //    필수 사용자 정보가 있는지 확인
        if(personEntity == null || personEntity.getPersonId() == null ) {
            throw new RuntimeException("Invalid arguments");
        }

        final String username = personEntity.getPersonId();
//    사용자 정보가 이미 DB에 존재하는지 확인
        if(personRepository.existsByPersonId(username)) {
            log.warn("Username already exists {}", username);
            throw new RuntimeException("Username already exists");
        }

        return personRepository.save(personEntity);
    }

    //  사용자 ID/PW 가져오기
    @Override
    public PersonEntity getByCredentials(String personId, String personPassword, PasswordEncoder passwordEncoder) {
        //    사용자 ID를 통해서 DB에 저장된 정보 가져오기
        final PersonEntity originalUser = personRepository.findByPersonId(personId);

        // DB에서 가져온 정보가 존재하고, matches 메서드를 이용해 패스워드가 같은지 확인
        if(originalUser != null && passwordEncoder.matches(personPassword, originalUser.getPersonPassword())) {
            return originalUser;
        }
        return null;
    }
}
