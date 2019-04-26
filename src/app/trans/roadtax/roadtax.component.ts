import { Component, OnInit } from '@angular/core';
import { TransServiceService } from '../trans-service.service';

@Component({
  selector: 'app-roadtax',
  templateUrl: './roadtax.component.html',
  styleUrls: ['./roadtax.component.css']
})
export class RoadtaxComponent implements OnInit {  
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
      if(element.rtaxBill != null || element.rtaxRenDate != null || element.rtaxExpDate != null ||element.rtaxNameRTO != null ||element.rtaxChalanNbr != null){
        this.vehicleLog.push(element);
      }
      /*<!-- private String ;
	private String ;
	private String ;
	private String ;
	private String ; -->
      */
    });
    if(this.vehicleLog === undefined ){
      alert('RoadTax is missing for all vehilces');
    }
  });
}

}
