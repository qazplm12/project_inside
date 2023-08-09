package com.bitc.project_inside.service;


import com.bitc.project_inside.data.entity.PersonEntity;

public interface SimService {
    int isUser(String email) throws Exception;

    int isNick(String nickName) throws Exception;

    void insertPerson(PersonEntity person) throws Exception;
}
