package com.project.spothunter.controller;

import com.google.gson.Gson;
import com.project.spothunter.model.Spot;
import com.project.spothunter.service.SpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {
    @Autowired
    SpotService spotService;

    @RequestMapping("/api/get/spots")
    public String spotList () {
        Gson gson = new Gson();
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

        String jsonCartList = gson.toJson(list);

        return jsonCartList;
    }
}
