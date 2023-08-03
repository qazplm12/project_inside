package com.bitc.project_inside.service;

import com.bitc.project_inside.data.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonDetailService implements UserDetailsService {

    private final PersonRepository personRepository;

    @Override
    public UserDetails loadUserByUsername(String personId) throws UsernameNotFoundException {
        return personRepository.findByPersonId(personId).orElseThrow(() -> new IllegalArgumentException(personId));
    }
}
