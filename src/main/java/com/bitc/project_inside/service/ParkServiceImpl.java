package com.bitc.project_inside.service;


import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.data.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ParkServiceImpl implements ParkService{

    private final PersonRepository personRepository;

    @Override
    public void insertToyProject(ProjectEntity projectEntity) throws Exception {

    }
}
