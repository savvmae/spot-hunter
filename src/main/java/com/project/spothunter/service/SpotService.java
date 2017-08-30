package com.project.spothunter.service;

import com.project.spothunter.model.Spot;
import java.util.List;

public interface SpotService {
    Spot add(Spot spot);
    Spot getById(int id);
    List<Spot> get();
}
