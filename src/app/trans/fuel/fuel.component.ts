import { Component, OnInit } from '@angular/core';
import { TransServiceService } from '../trans-service.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {
  
   
  constructor(public service: TransServiceService) { }

vehicleLog: Array<string> = [];
vehicleLogList: any;

ngOnInit() {
  this.service.getVehicleLogData().subscribe(response =>{
    if(response != null || response != undefined){
      this.vehicleLogList = response;
    } else {
      alert('No Logs found');
    }
    this.vehicleLogList.forEach((element, index) => {
      if(element.fuelBill != null || element.fuelPro != null || element.fuelCertNbr != null ||element.fuelFilldate != null ||element.fuelHSD != null || element.fuelBillNbr != null){
        this.vehicleLog.push(element);
      }
    });
    if(this.vehicleLog === undefined ){
      alert('RoadTax is missing for all vehilces');
    }
  });
}


}
