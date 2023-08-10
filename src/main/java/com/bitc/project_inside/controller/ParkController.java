package com.bitc.project_inside.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/pi")
public class ParkController {

    @RequestMapping(value={"/toyProject/ToyRegis"}, method = RequestMethod.GET)
    public String toyProjectGet() throws Exception{
        return "success";
    }

    @RequestMapping(value = "/toyProject/ToyRegis", method = RequestMethod.POST)
    public String toyProjectPost(
            @RequestParam(value = "projectTitle", required = false) String projectTitle,
            @RequestParam(value = "totalPerson", required = false) String totalPerson,
            @RequestParam(value = "levels", required = false) String levels,
            @RequestParam(value = "content", required = false) String content
    ) {
        System.out.println("projectTitle: " + projectTitle);
        System.out.println("totalPerson: " + totalPerson);
        System.out.println("levels: " + levels);
        System.out.println("content: "+ content);
        return "가나";
    }
}
