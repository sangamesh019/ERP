import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, Form } from "@angular/forms";
import { Router } from "@angular/router";
import { TransServiceService } from "./trans-service.service";

@Component({
  selector: "app-trans",
  templateUrl: "./trans.component.html",
  styleUrls: ["./trans.component.css"]
})
export class TransComponent implements OnInit {
  showHome: boolean = true;
  addVehicle: boolean = false;
  dashboard: boolean = false;
  vDetails: boolean = true;
  dailylog: boolean;
  totalBusCount: string;

  newVehicle: FormGroup;
  vehicleLogGroup: FormGroup;
  vehicleRep: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: TransServiceService,
    public route: Router
  ) { }

  ngOnInit() {
    this.addVehicle = false;
    this.showHome = true;
    this.dashboard = false;
    this.vDetails = true;
    this.dailylog = false;

    // repair section
    this.insuranceScreen = false;

    this.vehicleRep = this.getvehicleRepGroup(this.fb);
    this.newVehicle = this.getnewVehicle(this.fb);
    this.vehicleLogGroup = this.getvehicleLogGroup(this.fb);

    this.service.listVehicleDetails().subscribe(response => {
      if (response) {
        this.totalBusCount = response;
      } else {
        this.totalBusCount = '0';
      }
    });
  }

  getvehicleLogGroup(fb: FormBuilder) {
    return fb.group({
      amount: ["", Validators.required],
      // certStartdate: ["", Validators.required],
      complain: ["", Validators.required],
      dateComplain: ["", Validators.required],
      desiel: ["", Validators.required],
      desielFilledLoc: ["", Validators.required],
      desielFilledLocInfo: ["", Validators.required],
      destinationPoint: ["", Validators.required],
      driSign: ["", Validators.required],
      driverName: ["", Validators.required],
      finalReading: ["", Validators.required],
      inchargeSign: ["", Validators.required],
      initReading: ["", Validators.required],
      kms: ["", Validators.required],
      // logDate: ["", Validators.required],
      pickPoint: ["", Validators.required],
      repairs: ["", Validators.required],
      vehicleNbr: ["", Validators.required],
      insBill: [],
      insRenDate: [],
      insExpdate: [],
      inNameOfComp: [],
      insPolNbr: [],
      rtaxBill: [],
      rtaxRenDate: [],
      rtaxExpDate: [],
      rtaxNameRTO: [],
      rtaxChalanNbr: [],
      fitBill: [],
      fitRenNbr: [],
      fitExpNbr: [],
      fitnameRTO: [],
      fitCertnbr: [],
      fuelBill: [],
      fuelPro: [],
      fuelCertNbr: [],
      fuelFilldate: [],
      fuelHSD: [],
      fuelBillNbr: [],

    });
  }
  submitLog() {
    if (this.vehicleLogGroup.valid) {
      this.service.saveLog(this.mapLog(this.vehicleLogGroup)).subscribe(response => {
        if (response != undefined) {
          alert('log saved');
        } else {
          alert('log did not saved');
        }
      });
    } else {
      alert('Please validate the fields')
    }
  }
  searchLog() {

  }
  mapLog(log: FormGroup) {
    return {
      amount: log.controls['amount'].value,
      certStartdate: '',
      complain: log.controls['complain'].value,
      dateComplain: log.controls['dateComplain'].value,
      desiel: log.controls['desiel'].value,
      desielFilledLoc: log.controls['desielFilledLoc'].value,
      desielFilledLocInfo: log.controls['desielFilledLocInfo'].value,
      destinationPoint: log.controls['destinationPoint'].value,
      driSign: log.controls['driSign'].value,
      driverName: log.controls['driverName'].value,
      finalReading: log.controls['finalReading'].value,
      inchargeSign: log.controls['inchargeSign'].value,
      initReading: log.controls['initReading'].value,
      kms: log.controls['kms'].value,
      logDate: '',
      pickPoint: log.controls['pickPoint'].value,
      repairs: log.controls['repairs'].value,
      vehicleNbr: log.controls['vehicleNbr'].value,
      vehicleRegNbr: '',
      insBill: log.controls['insBill'].value,
      insRenDate: log.controls['insRenDate'].value,
      insExpdate: log.controls['insExpdate'].value,
      inNameOfComp: log.controls['inNameOfComp'].value,
      insPolNbr: log.controls['insPolNbr'].value,
      rtaxBill: log.controls['rtaxBill'].value,
      rtaxRenDate: log.controls['rtaxRenDate'].value,
      rtaxExpDate: log.controls['rtaxExpDate'].value,
      rtaxNameRTO: log.controls['rtaxNameRTO'].value,
      rtaxChalanNbr: log.controls['rtaxChalanNbr'].value,
      fitBill: log.controls['fitBill'].value,
      fitRenNbr: log.controls['fitRenNbr'].value,
      fitExpNbr: log.controls['fitExpNbr'].value,
      fitnameRTO: log.controls['fitnameRTO'].value,
      fitCertnbr: log.controls['fitCertnbr'].value,
      fuelBill: log.controls['fuelBill'].value,
      fuelPro: log.controls['fuelPro'].value,
      fuelCertNbr: log.controls['fuelCertNbr'].value,
      fuelFilldate: log.controls['fuelFilldate'].value,
      fuelHSD: log.controls['fuelHSD'].value,
      fuelBillNbr: log.controls['fuelBillNbr'].value,
    }
  }
  getvehicleRepGroup(fb: FormBuilder) {
    return fb.group({
      amountSpare: ["", Validators.required],
      batterCost: ["", Validators.required],
      grandTotal: ["", Validators.required],
      insurance: ["", Validators.required],
      lab: ["", Validators.required],
      taxPaid: ["", Validators.required],
      totalFuel: ["", Validators.required],
      tyreCost: ["", Validators.required]
    });
  }

  getnewVehicle(fb: FormBuilder) {
    return fb.group({
      // 'amount': ['', Validators.required],
      // 'certExpdate': ['', Validators.required],
      // 'certNbr': ['', Validators.required],
      // 'certRenDate': ['', Validators.required],
      chassisNbr: ["", Validators.required],
      chassisWeight: ["", Validators.required],
      commDate: ["", Validators.required],
      engMType: ["", Validators.required],
      engNbr: ["", Validators.required],
      fuelTankCap: ["", Validators.required],
      mChassis: ["", Validators.required],
      mType: ["", Validators.required],
      regNbr: ["", Validators.required],
      regloadCap: ["", Validators.required],
      sizeFrontTire: ["", Validators.required],
      sizeRearTire: ["", Validators.required],
      stUnitNbr: ["", Validators.required],
      typeBody: ["", Validators.required],
      unloadCap: ["", Validators.required],
      wheelBase: ["", Validators.required]
    });
  }
  registerNewVehi() {
    if (this.newVehicle.valid) {
      let mapObj = this.mappRegisterNewVehi(this.newVehicle);
      this.service.registerNewV(mapObj).subscribe(response => {
        if (response != undefined) {
          alert("added new vehicle");
        } else {
          alert("sorry vehicle");
        }
      });
    }
  }
  mappRegisterNewVehi(newVehicle: FormGroup) {
    return {
      amount: "",
      certExpdate: "",
      certNbr: "",
      certRenDate: "",
      chassisNbr: newVehicle.controls["chassisNbr"].value,
      chassisWeight: newVehicle.controls["chassisWeight"].value,
      commDate: newVehicle.controls["commDate"].value,
      engMType: newVehicle.controls["engMType"].value,
      engNbr: newVehicle.controls["engNbr"].value,
      fuelTankCap: newVehicle.controls["fuelTankCap"].value,
      mChassis: newVehicle.controls["mChassis"].value,
      mType: newVehicle.controls["mType"].value,
      regNbr: newVehicle.controls["regNbr"].value,
      regloadCap: newVehicle.controls["regloadCap"].value,
      sizeFrontTire: newVehicle.controls["sizeFrontTire"].value,
      sizeRearTire: newVehicle.controls["sizeRearTire"].value,
      stUnitNbr: newVehicle.controls["stUnitNbr"].value,
      typeBody: newVehicle.controls["typeBody"].value,
      unloadCap: newVehicle.controls["unloadCap"].value,
      wheelBase: newVehicle.controls["wheelBase"].value
    };
  }
  public vReport = {
    amountSpare: "",
    batterCost: "",
    grandTotal: "",
    insurance: "",
    lab: "",
    taxPaid: "",
    totalFuel: "",
    tyreCost: "",
    year: ""
  };
  public vehicleLog = {
    amount: "",
    certStartdate: "",
    complain: "",
    dateComplain: "",
    desiel: "",
    desielFilledLoc: "",
    desielFilledLocInfo: "",
    destinationPoint: "",
    driSign: "",
    driverName: "",
    finalReading: "",
    inchargeSign: "",
    initReading: "",
    kms: "",
    logDate: "",
    pickPoint: "",
    repairs: "",
    insBill: "",
    insRenDate: "",
    insExpdate: "",
    inNameOfComp: "",
    insPolNbr: "",
    rtaxBill: "",
    rtaxRenDate: "",
    rtaxExpDate: "",
    rtaxNameRTO: "",
    rtaxChalanNbr: "",
    fitBill: "",
    fitRenNbr: "",
    fitExpNbr: "",
    fitnameRTO: "",
    fitCertnbr: "",
    fuelBill: "",
    fuelPro: "",
    fuelCertNbr: "",
    fuelFilldate: "",
    fuelHSD: "",
    fuelBillNbr: "",
    vehicleNbr: "",
    vehicleRegNbr: ""
  };
  public addVehicleDetails = {
    amount: "",
    certExpdate: "",
    certNbr: "",
    certRenDate: "",
    chassisNbr: "",
    chassisWeight: "",
    commDate: "",
    engMType: "",
    engNbr: "",
    fuelTankCap: "",
    mChassis: "",
    mType: "",
    regNbr: "",
    regloadCap: "",
    sizeFrontTire: "",
    sizeRearTire: "",
    stUnitNbr: "",
    typeBody: "",
    unloadCap: "",
    wheelBase: ""
  };

  vehicle() {
    this.addVehicle = false;
    this.showHome = true;
    this.dashboard = false;
    this.vDetails = true;
    this.dailylog = false;
    this.showInsLogData = false;
    this.showRoadtax = false;
    this.showFitness= false;
    this.showFuel = false;
  }
  addVehicleButton() {
    this.addVehicle = true;
    this.showHome = false;
    this.dashboard = false;
    this.vDetails = true;
    this.dailylog = false;
    this.showInsLogData = false;
    this.showRoadtax = false;
    this.showFitness= false;
    this.showFuel = false;
  }

  lookDashboard() {
    this.addVehicle = false;
    this.showHome = false;
    this.dashboard = true;
    this.vDetails = false;
    this.dailylog = false;
    this.showInsLogData = false;
    this.showRoadtax = false;
    this.showFitness= false;
  }
  dailylogButton() {
    this.addVehicle = false;
    this.showHome = false;
    this.dashboard = false;
    this.vDetails = false;
    this.dailylog = true;
    this.showInsLogData = false;
    this.showRoadtax = false;
    this.showFitness= false;
    this.showFuel = false;
  }
  get mChassis() { return this.newVehicle.get('mChassis'); }
  // get password() { return this.profileForm.get('password'); }

  insuranceScreen: boolean;
  roadTaxScreen: boolean;
  fitnessScreen: boolean;
  fuelScreen: boolean;

  selectedRepare() {
    this.showInsLogData = false;
    this.showFitness= false;
    this.showFuel = false;
    let selectedVal = this.vehicleLogGroup.controls['repairs'].value;
    if (selectedVal === 'insurance') {
      this.insuranceScreen = true;
      this.roadTaxScreen = false;
      this.fitnessScreen = false;
      this.fuelScreen = false;
      
    } else if (selectedVal === 'roadTax') {
      this.insuranceScreen = false;
      this.roadTaxScreen = true;
      this.fitnessScreen = false;
      this.fuelScreen = false;
    } else if (selectedVal === 'fitness') {
      this.insuranceScreen = false;
      this.roadTaxScreen = false;
      this.fitnessScreen = true;
      this.fuelScreen = false;
    } else if (selectedVal === 'fuel') {
      this.insuranceScreen = false;
      this.roadTaxScreen = false;
      this.fitnessScreen = false;
      this.fuelScreen = true;

    }
  }
  showInsLogData: boolean;
  showRoadtax: boolean;
  showFitness: boolean;
  showFuel: boolean;

  showInsurenceData(){
  this.showInsLogData = true;
  this.showRoadtax = false;
  this.showFitness= false;
  this.showFuel = false;
  }
  showRoadtaxData(){
    this.showInsLogData = false;
    this.showRoadtax = true;
    this.showFitness= false;
    this.showFuel = false;
  }
  showFitnessData(){
    this.showInsLogData = false;
  this.showRoadtax = false;
  this.showFitness= true;
  this.showFuel = false;
  }
  showFuelData(){
    this.showInsLogData = false;
  this.showRoadtax = false;
  this.showFitness= false;
    this.showFuel = true;
  }
}
