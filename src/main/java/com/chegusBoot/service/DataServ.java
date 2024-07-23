package com.chegusBoot.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chegusBoot.beans.DataBank;
import com.chegusBoot.beans.DataBranch;
import com.chegusBoot.beans.DataPerson;
import com.chegusBoot.repository.BranchRepo;
import com.chegusBoot.repository.DataRepo;
import com.chegusBoot.repository.PersonRepo;


@Service
public class DataServ {
	@Autowired
	private DataRepo repo;

	@Autowired
	private BranchRepo repo1;
	
	@Autowired
	private PersonRepo repo2;

	@CacheEvict(value = "Banks",allEntries = true)
	@Transactional
	public void persistData(DataBank bank) {
		System.out.println("Test........");
		if(bank.getBid() != null) {
			DataBank existBank = repo.findById(bank.getBid()).get();
			for (DataBranch existBranch : existBank.getLst()) {
					boolean branchExists = false;
					for (DataBranch newBranch : bank.getLst()) {
						if(Objects.equals(newBranch.getBranchId(), existBranch.getBranchId())) {
							branchExists = true;
						}
						for (DataPerson person : existBranch.getSublst()) {
							boolean isPersonExists = false;
							for (DataPerson newPerson : newBranch.getSublst()) {
								if(Objects.equals(person.getPersonId(), newPerson.getPersonId())){
									isPersonExists = true;
								}
							}
							if(!isPersonExists) {
								repo2.delete(person);
							}
						}
					}
					if(!branchExists) {
						repo1.delete(existBranch);
					}
				}
		} 
			repo.save(bank); 

			for (DataBranch branch : bank.getLst()) {
				branch.setBank(bank);
				for (DataPerson person : branch.getSublst()) {
					person.setBranch(branch);
					repo2.save(person);
				}
				repo1.save(branch);
			}
		}




	public DataBank fetchData(Long id) {
		return repo.findById(id).get();
	}



	@Cacheable("Banks")
	public List<DataBank> fetchAll() {
		System.out.println("Hit to the dataBase...");
		return repo.findAll();
	}


	@CacheEvict(value = "Banks",allEntries = true)
	@Transactional
	public void removeData(Long id) {
		repo.deleteById(id);
	}






}
