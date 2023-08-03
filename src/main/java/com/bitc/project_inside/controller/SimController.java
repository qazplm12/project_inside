package com.bitc.project_inside.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/pi")
public class SimController {

    @RequestMapping(value = {"main", "/"}, method = RequestMethod.GET)
    public String app() throws Exception {


        return "success";
    }


}
