import { Component, OnInit } from '@angular/core';
import { TravelPackagesService } from "../../travel-packages.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {getLocaleTimeFormat} from "@angular/common";

@Component({
  selector: 'app-show-packages',
  templateUrl: './show-packages.component.html',
  styleUrls: ['./show-packages.component.css']
})
export class ShowPackagesComponent implements OnInit {
  travelPkgs: any; // form control data
  data: any;
  id:any
  flightDropdownFill: any[] = [];
  locationDropdownFill: any[] = [];
  activityDropdownFill: any[] = [];
  TravelPkgs: any | undefined; // table data
  FormTitle:any
  BtnTitle:any


  constructor(private travelPackageService: TravelPackagesService, private router: Router) { }

  ngOnInit(): void {
    this.travelPackageService.getVwTravelPackages().subscribe(data => {
      this.TravelPkgs = data;
      console.log(data);
    });
  }

  deleteTravelPackage(id: number): void {
    if (confirm('Are you sure?')) {
      this.travelPackageService.deleteTravelPackages(id).subscribe(data => {
        console.log(data);
        this.ngOnInit();
      });
    }
  }

  editClick(id: number): void {
    this.FormTitle='Edit Record'
    this.BtnTitle='Update'
    this.id = id
    this.travelPackageService.getVwTravelPackagesByID(this.id).subscribe(data => {
      if (data) {
        this.travelPkgs = data;
        console.log(data);

        this.form.patchValue({
          Travel_Package_Name: this.travelPkgs.Travel_Package_Name,
          Location_ID: this.travelPkgs.LocationID,
          Flight_ID: this.travelPkgs.FlightID,
          Hotel_Rooms_ID: this.travelPkgs.HotelRoom,
          Activity_ID: this.travelPkgs.ActivityID,
          Package_Price: this.travelPkgs.Package_Price,
          Package_Description: this.travelPkgs.Package_Description
        });
      }
    });

    // Flight Dropdown Fill
    this.travelPackageService.getFlightDropdown().subscribe(data => {
      this.flightDropdownFill = data;
      console.log(data);
    });

    // Locations Dropdown Fill
    this.travelPackageService.getLocationDropdown().subscribe(data => {
      this.locationDropdownFill = data;
      console.log(data);
    });

    // Activities Dropdown Fill
    this.travelPackageService.getActivityDropdown().subscribe(data => {
      this.activityDropdownFill = data;
      console.log(data);
    });
  }

  form = new FormGroup({
    Travel_Package_Name: new FormControl('', Validators.required),
    Location_ID: new FormControl('', Validators.required),
    Flight_ID: new FormControl('', Validators.required),
    Hotel_Rooms_ID: new FormControl('', Validators.required),
    Activity_ID: new FormControl('', Validators.required),
    Package_Price: new FormControl('', Validators.required),
    Package_Description: new FormControl('', Validators.required)
  });

  ngSubmitForms(){

    if(this.id==0)
    {
      this.addTravelPackages()
    }
    else{
      this.updateTravelPackages()
    }

  }
  updateTravelPackages(): void {
    this.data = this.form.value;
    this.travelPackageService.updateTravelPackages(this.travelPkgs?.id, this.data).subscribe(data => {
      if (data) {
        console.log(data);
        alert('Record updated successfully!');
        this.ngOnInit();
      }
    });
  }

  addClick(): void {
    this.id=0
    this.form.reset()
    this.FormTitle='Add New Record'
    this.BtnTitle='Save'

    // Flight Dropdown Fill
    this.travelPackageService.getFlightDropdown().subscribe(data => {
      this.flightDropdownFill = data;
      console.log(data);
    });

    // Locations Dropdown Fill
    this.travelPackageService.getLocationDropdown().subscribe(data => {
      this.locationDropdownFill = data;
      console.log(data);
    });

    // Activities Dropdown Fill
    this.travelPackageService.getActivityDropdown().subscribe(data => {
      this.activityDropdownFill = data;
      console.log(data);
    });
  }
  closeClick(){
    this.form.reset()
     this.ngOnInit()
  }

  addTravelPackages(): void {
    if(!this.form.valid)
    {
      console.log('the form is not valid.')
      return;
    }
    this.data = this.form.value;
    this.travelPackageService.addTravelPackages(this.data).subscribe(data => {
      console.log(data);
      alert('Record added successfully.')
      this.ngOnInit();
    });
  }
}
