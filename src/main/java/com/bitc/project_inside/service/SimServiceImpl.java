package com.bitc.project_inside.service;


import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SimServiceImpl implements SimService{

    private final PersonRepository personRepository;

    @Override
    public int isUser(String email) throws Exception {

        return personRepository.countByPersonId(email);
    }

    @Override
    public int isNick(String nickName) throws Exception {
        return personRepository.countByPersonNickName(nickName);
    }

    @Override
    public void insertPerson(PersonEntity person) throws Exception {
        personRepository.save(person);
    }

}
