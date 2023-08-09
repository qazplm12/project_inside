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

    @ResponseBody
    @RequestMapping(value="/toyProject/ToyRegis", method=RequestMethod.POST)
    public String toyProjectPost(
            @RequestParam("projectTitle") String projectTitle,
            @RequestParam("totalPerson") String totalPerson,
            @RequestParam("levels") String levels
    ) throws Exception{
        System.out.println("값을 확인을 해 봅시다."+ projectTitle);
        return "가나";
    }
}
