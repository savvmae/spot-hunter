package com.project.spothunter.controller;

import com.project.spothunter.model.Spot;
import com.project.spothunter.service.SpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MainController {

    @Autowired
    SpotService spotService;

    @RequestMapping("/api/get/spots")
    public List<Spot> spotList () {
        Spot spot1 = new Spot();
        spot1.setLatitude("50");
        spot1.setLongitude("50");
        spot1.setComments("Something");
        spot1.setId(1);
        spot1.setTaken(false);
        spot1.setType("Broken Meter");
        spot1.setUserId(1);

        List<Spot> list = new ArrayList<>();
        list.add(spot1);

        return list;
    }
}
