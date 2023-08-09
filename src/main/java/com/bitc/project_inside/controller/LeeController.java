package com.bitc.project_inside.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/pi")
public class LeeController {
    @RequestMapping(value = {"lee"}, method = RequestMethod.GET)
    public String lee() throws Exception {


        return "success";
    }

    @RequestMapping(value = {"http://localhost:8080/pi/test"}, method = RequestMethod.GET)
    public Object test() throws Exception {


        return "success";
    }
}
