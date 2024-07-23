package com.chegusBoot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chegusBoot.beans.BranchCity;
import com.chegusBoot.beans.BranchName;
import com.chegusBoot.beans.DataBank;
import com.chegusBoot.repository.BranchCityRepo;
import com.chegusBoot.repository.BranchNameRepo;

@Service
public class IndependentTable {
	private final BranchCityRepo repo1;
	private final BranchNameRepo repo2;

	private IndependentTable(BranchCityRepo repo1,BranchNameRepo repo2) {
		this.repo1 = repo1;
		this.repo2 = repo2;
	}
	
	public void persistData(BranchCity branch) {
		repo1.save(branch);
		for (BranchName bn: branch.getClst()) {
			bn.setCity(branch);
			repo2.save(bn);
		}
	}


	public List<BranchCity> fetchAll() {
		return repo1.findAll();
	}

	public BranchCity fetchData(Long id) {
		return repo1.findById(id).get();
	}

}
