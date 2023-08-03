package com.bitc.project_inside.service;


import com.bitc.project_inside.data.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SimServiceImpl implements SimService{

    private final PersonRepository personRepository;

}
