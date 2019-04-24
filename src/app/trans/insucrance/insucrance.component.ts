import { Component, OnInit } from '@angular/core';
import { TransServiceService } from '../trans-service.service';

@Component({
  selector: 'app-insucrance',
  templateUrl: './insucrance.component.html',
  styleUrls: ['./insucrance.component.css']
})
export class InsucranceComponent implements OnInit {

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
        if(element.insPolNbr != null || element.inNameOfComp != null || element.inNameOfComp != null ||element.insExpdate != null ||element.insRenDate != null || element.insBill !== null){
          this.vehicleLog.push(element);
        }
      });
      if(this.vehicleLog === undefined ){
        alert('Insurence is missing for all vehilces');
      }
    });
  }

}
