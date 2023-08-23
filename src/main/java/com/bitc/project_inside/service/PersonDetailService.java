//package com.bitc.project_inside.service;
//
//import com.bitc.project_inside.data.DTO.PersonRequest;
//import com.bitc.project_inside.data.entity.PersonEntity;
//import com.bitc.project_inside.data.repository.PersonRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Log4j2
//@Service
//@RequiredArgsConstructor
//public class PersonDetailService implements UserDetailsService {
//
//    private final PersonRepository personRepository;
//
////    @Override
////    public UserDetails loadUserByUsername(String personId) throws UsernameNotFoundException {
////
////        Optional<PersonEntity> person = personRepository.findByPersonId(personId
//////                , false
////        );
////        if(!person.isPresent()){
////            throw new UsernameNotFoundException("사용자 정보 확인");
////        }
////
////        PersonEntity personEntity = person.get();
////        System.out.println(personEntity);
////
////        PersonRequest personRequest = new PersonRequest(
////                personEntity.getPersonId(),
////                personEntity.getPersonPassword(),
////                //PersonRole은 스프링 시큐리티에서 사용하는 SimpleGrantedAuthority로 변환,
////                //이때 'ROLE_'라는 접두어를 추가해서 사용한다.
////                //user95@zerock.org 같은 경우 롤이 3개다 [USER, MANAGER, ADMIN]
////                //이 각각을 [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER]로 변환해서 Set으로 넣어주고 그 컬렉션을 반환한다.
////                personEntity.getRoleSet().stream()
////                        .map(role->new SimpleGrantedAuthority("ROLE_"+role.name())).collect(Collectors.toSet()));
////
////        personRequest.setPersonNickName(personEntity.getPersonNickName());
////        System.out.println(personRequest.getAuthorities().toString());
////
//////        return personRepository.findByPersonId(personId).orElseThrow(() -> new IllegalArgumentException(personId));
////        return personRequest;
////    }
//
//    @Override
//    public UserDetails loadUserByUsername(String personId) throws UsernameNotFoundException {
//
//        Optional<PersonEntity> person = personRepository.findByPersonId(personId);
//
//        return personRepository.findByPersonId(personId).orElseThrow(() -> new IllegalArgumentException(personId));
//    }
//}
