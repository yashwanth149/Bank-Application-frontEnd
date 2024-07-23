package com.chegusBoot.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/*import org.springframework.web.servlet.view.RedirectView;      ---------redirecting page in springBoot instead Model....dont forget*/

import com.chegusBoot.beans.BranchCity;
import com.chegusBoot.beans.DataBank;
import com.chegusBoot.service.DataServ;
import com.chegusBoot.service.IndependentTable;



@RestController
@RequestMapping("/bank")
@CrossOrigin(origins = "*")
public class DataController {
	private final DataServ serv1;
	private final IndependentTable serv2;

    public DataController(DataServ serv,IndependentTable indServ) {
        this.serv1 = serv;
        this.serv2 = indServ;
    }
	
	@GetMapping("/home")
	public ResponseEntity<List<DataBank>> getBankLst() {
		List<DataBank> banks = serv1.fetchAll();
		return new ResponseEntity<>(banks,HttpStatus.OK);
	}
	
	@GetMapping("/fetchById/{id}")
	public ResponseEntity<DataBank> getBankById(@PathVariable("id") Long id) {
		DataBank bank = serv1.fetchData(id);
		return new ResponseEntity<>(bank,HttpStatus.OK);
	}
	
	
	@PostMapping("/add")
	public void addEmp(@RequestBody DataBank bank){
		serv1.persistData(bank);
	} 
	
	
	
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteEmpById(@PathVariable("id") Long id){
		serv1.removeData(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
	
	// independent Tables
	@PostMapping("/addbranch")
	public void addEmp(@RequestBody BranchCity branch){
		serv2.persistData(branch);
	} 
	
	@GetMapping("/branchlst")
	public ResponseEntity<List<BranchCity>> getBranchCityLst() {
		List<BranchCity> cities = serv2.fetchAll();
		return new ResponseEntity<>(cities,HttpStatus.OK);
	}
	
	@GetMapping("/cityId/{id}")
	public ResponseEntity<BranchCity> getCityById(@PathVariable("id") Long id) {
		BranchCity city = serv2.fetchData(id);
		return new ResponseEntity<>(city,HttpStatus.OK);
	}	
	
}
