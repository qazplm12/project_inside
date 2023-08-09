package com.bitc.project_inside.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/pi")
public class ParkController {

    @RequestMapping(value={"/park"}, method = RequestMethod.GET)
    public String toyproject() throws Exception{
        return "success";
    }

    @ResponseBody
    @RequestMapping(value="/park", method=RequestMethod.POST)
    public String toyProjectPost() throws Exception{

        return "";
    }
}
