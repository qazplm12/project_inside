package com.bitc.project_inside.service;

import com.bitc.project_inside.data.DTO.PersonRequest;

public interface PersonService {

    int save(PersonRequest dto) throws Exception;
}
