import { Component, OnInit } from '@angular/core';
import { TransServiceService } from '../trans-service.service';

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css']
})
export class FitnessComponent implements OnInit {
   
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
    this.vehicleLogList.forEach(element => {
      if(element.fitBill != null || element.fitRenNbr != null || element.fitExpNbr != null ||element.fitnameRTO != null ||element.fitCertnbr != null){
        this.vehicleLog.push(element);
      }
    });
    if(this.vehicleLog === undefined ){
      alert('RoadTax is missing for all vehilces');
    }
  });
}
}
