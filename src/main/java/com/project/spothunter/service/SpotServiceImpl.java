package com.project.spothunter.service;

import com.project.spothunter.model.Spot;
import com.project.spothunter.repository.SpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SpotServiceImpl implements SpotService {
    @Autowired
    SpotRepository spotRepository;

    @Transactional
    @Override
    public Spot add(Spot spot) {
        return spotRepository.save(spot);
    }

    @Override
    public Spot getById(int id) {
        return spotRepository.findOne(id);
    }

    @Override
    public List<Spot> get() {
        return spotRepository.findAll();
    }

}
