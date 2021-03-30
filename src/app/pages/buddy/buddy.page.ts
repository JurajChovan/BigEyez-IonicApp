/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as Parameters from '../../components/configuration/configuration';
import { CommonFunctionsService } from '../../services/common-functions.service';
/* ------------------------------------------------------------------------------------------------------------ */
declare var H;
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.page.html',
  styleUrls: ['./buddy.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class BuddyPage implements OnInit {
/* ------------------------------------------------------------------------------------------------------------ */
  platform: any;
  map: any;
  hereMapApiKey: string;
  BuddyInfo = null;
  results: Observable<any>;
/* ------------------------------------------------------------------------------------------------------------ */
  constructor(
    private apiDataService: APIdataService,
    private commonFunctionsService: CommonFunctionsService,
    private route: ActivatedRoute,
    public alertCtrl: AlertController
    ) {
      this.hereMapApiKey=Parameters.Cnfg.HEREMapApiKey;
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      if (!paramMap.has('BuddyID')) {
        return;
      }
      const BuddyID=paramMap.get('BuddyID');
      this.apiDataService.getBuddyInfo(BuddyID).subscribe(
        result=>{
          this.BuddyInfo=result;
          var DateLastUpdate: any = new Date(this.BuddyInfo.LastUpdate);
          var DateNow: any = new Date();
          var DateDifference = Math.floor((DateNow - DateLastUpdate) / (24 * 3600 * 1000));
          this.BuddyInfo.DateDiffInDays=DateDifference;
        }
      );
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  ionViewDidEnter()  {
    // vypocita GPS suradnicu na vycentrovanie zobrazenej mapy a zoom level:
    var CenterPositionAndZoom=this.commonFunctionsService.GetMapCenterPositionAndZoom(
      this.BuddyInfo.LoggedUserLatitude,
      this.BuddyInfo.LoggedUserLongitude,
      this.BuddyInfo.Lat,
      this.BuddyInfo.Lng);
    var totoCele = this;
    setTimeout(function(){
      this.platform = new H.service.Platform({
        'apikey': totoCele.hereMapApiKey
      });
      var maptypes = this.platform.createDefaultLayers();
      this.map = new H.Map(
        document.getElementById('mapContainer'), maptypes.raster.normal.map,
        {
          zoom: CenterPositionAndZoom.zoomLevel,
          center: { lat: CenterPositionAndZoom.centerLat, lng: CenterPositionAndZoom.centerLng } 
        });
      // toto vracia chybu CORS:
      // http://bigeyez/public/{{ BuddyInfo?.Location }}/{{ BuddyInfo?.FileName }}
      // var defaultIcon = new H.map.Icon("http://bigeyez/public/"+totoCele.BuddyInfo.Location+'/'+totoCele.BuddyInfo.FileName, { size: { w: 30, h: 30 } });
      var BuddyIcon = new H.map.Icon(Parameters.Cnfg.BuddyMarkerFile, { size: { w: 22, h: 40 } });
      var BuddyMarker = new H.map.Marker({ lat: totoCele.BuddyInfo.Lat, lng: totoCele.BuddyInfo.Lng },{ icon: BuddyIcon });
      this.map.addObject(BuddyMarker);
      var LoggedUserIcon = new H.map.Icon(Parameters.Cnfg.LoggedUserMarkerFile, { size: { w: 22, h: 40 } });
      var LoggedUserMarker = new H.map.Marker({ lat: totoCele.BuddyInfo.LoggedUserLatitude, lng: totoCele.BuddyInfo.LoggedUserLongitude },{ icon: LoggedUserIcon });
      this.map.addObject(LoggedUserMarker);
      var ui = H.ui.UI.createDefault(this.map, maptypes);
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    },2000);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Confirm" ak zmeniù status buddy-ho na "Accepted": */
  async showConfirmToAccepted(BuddyID, BuddyFirstName, BuddyLastName, BuddyStatusID) { 
    var StatusString: string;
    if (BuddyStatusID===1) {
      StatusString="ACCEPTED";
    } else if (BuddyStatusID===2) {
      StatusString='WAITED';
    } else if (BuddyStatusID===4)  {
      StatusString="REMOVED";
    } else if (BuddyStatusID===5)  {
      StatusString="BANNED";
    } else {
      StatusString="N/A";
    }
    const confirmChange = await this.alertCtrl.create({ 
      header: 'Change status', 
      message: 'Do you want to change status of this buddy? <p><b>'+BuddyFirstName+' '+BuddyLastName
        +'</b></p>Buddy ID: '+BuddyID+' change from <b>'+StatusString+'</b> to <b>ACCEPTED</b>', 
      buttons: [
      { 
        text: 'Change',
        role: 'Change', 
        handler: () => {  
          if (BuddyStatusID===1) {
          } else if (BuddyStatusID===2) {
            StatusString='WAITED';
            this.apiDataService.getWa2Ac(BuddyID).subscribe(
              result=>{
                this.BuddyInfo=result;
              }
            );
          } else if (BuddyStatusID===4)  {
          } else if (BuddyStatusID===5)  {
          } else {  }
        } 
      }, { 
        text: 'Cancel', 
        role: 'Cancel',
        handler: () => { 
        } 
      }] 
    }); 
    await confirmChange.present(); 
  } 
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Confirm" ak zmeniù status buddy-ho na "Waited": */
  async showConfirmToWaited(BuddyID, BuddyFirstName, BuddyLastName, BuddyStatusID) { 
    var StatusString: string;
    if (BuddyStatusID===1) {
      StatusString="ACCEPTED";
    } else if (BuddyStatusID===2) {
      StatusString='WAITED';
    } else if (BuddyStatusID===4)  {
      StatusString="REMOVED";
    } else if (BuddyStatusID===5)  {
      StatusString="BANNED";
    } else {
      StatusString="N/A";
    }
    const confirmChange = await this.alertCtrl.create({ 
      header: 'Change status', 
      message: 'Do you want to change status of this buddy? <p><b>'+BuddyFirstName+' '+BuddyLastName
        +'</b></p>Buddy ID: '+BuddyID+' change from <b>'+StatusString+'</b> to <b>WAITED</b>', 
      buttons: [
      { 
        text: 'Change',
        role: 'Change', 
        handler: () => {  
          if (BuddyStatusID===1) {
            this.apiDataService.getAc2Wa(BuddyID).subscribe(
              result=>{
                this.BuddyInfo=result;
              }
            );
          } else if (BuddyStatusID===2) {
          } else if (BuddyStatusID===4)  {
            this.apiDataService.getRe2Wa(BuddyID).subscribe(
              result=>{
                this.BuddyInfo=result;
              }
            );
          } else if (BuddyStatusID===5)  {
            this.apiDataService.getBa2Wa(BuddyID).subscribe(
              result=>{
                this.BuddyInfo=result;
              }
            );
          } else {  }
        } 
      }, { 
        text: 'Cancel', 
        role: 'Cancel',
        handler: () => { 
        } 
      }] 
    }); 
    await confirmChange.present(); 
  } 
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Confirm" ak zmeniù status buddy-ho na "Removed": */
  async showConfirmToRemoved(BuddyID, BuddyFirstName, BuddyLastName, BuddyStatusID) { 
    var StatusString: string;
    if (BuddyStatusID===1) {
      StatusString="ACCEPTED";
    } else if (BuddyStatusID===2) {
      StatusString='WAITED';
    } else if (BuddyStatusID===4)  {
      StatusString="REMOVED";
    } else if (BuddyStatusID===5)  {
      StatusString="BANNED";
    } else {
      StatusString="N/A";
    }
    const confirmChange = await this.alertCtrl.create({ 
      header: 'Change status', 
      message: 'Do you want to change status of this buddy? <p><b>'+BuddyFirstName+' '+BuddyLastName
        +'</b></p>Buddy ID: '+BuddyID+' change from <b>'+StatusString+'</b> to <b>REMOVED</b>', 
      buttons: [
      { 
        text: 'Change',
        role: 'Change', 
        handler: () => {  
          if (BuddyStatusID===1) {
            this.apiDataService.getAc2Re(BuddyID).subscribe(
              result=>{
                this.BuddyInfo=result;
              }
            );
          } else if (BuddyStatusID===2) {
            this.apiDataService.getWa2Re(BuddyID).subscribe(
              result=>{
                this.BuddyInfo=result;
              }
            );
          } else if (BuddyStatusID===4)  {
          } else if (BuddyStatusID===5)  {
          } else {  }
        } 
      }, { 
        text: 'Cancel', 
        role: 'Cancel',
        handler: () => { 
        } 
      }] 
    }); 
    await confirmChange.present(); 
  } 
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Confirm" ak chce vymazaù buddy-ho zo svojÌch list-ov: */
  async showConfirmToDelete(BuddyID, BuddyFirstName, BuddyLastName, BuddyStatusID) { 
    var StatusString: string;
    if (BuddyStatusID===1) {
      StatusString="ACCEPTED";
    } else if (BuddyStatusID===2) {
      StatusString='WAITED';
    } else if (BuddyStatusID===4)  {
      StatusString="REMOVED";
    } else if (BuddyStatusID===5)  {
      StatusString="BANNED";
    } else {
      StatusString="N/A";
    }
    const confirmDelete = await this.alertCtrl.create({ 
      header: 'Delete buddy', 
      message: 'Do you want to delete your buddy? <p><b>'+BuddyFirstName+' '+BuddyLastName
        +'</b></p>Buddy ID: '+BuddyID+' will deleted from all your lists.', 
      buttons: [
      { 
        text: 'Delete',
        role: 'Delete', 
        handler: () => {  
          this.apiDataService.deleteBuddy(BuddyID).subscribe(result=>{
          });
        } 
      }, { 
        text: 'Cancel', 
        role: 'Cancel',
        handler: () => { 
        } 
      }] 
    }); 
    await confirmDelete.present(); 
  } 
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Confirm" ak zmeniù status buddy-ho na "Banned": */
  async showConfirmToBanned(BuddyID, BuddyFirstName, BuddyLastName, BuddyStatusID) { 
    var StatusString: string;
    if (BuddyStatusID===1) {
      StatusString="ACCEPTED";
    } else if (BuddyStatusID===2) {
      StatusString='WAITED';
    } else if (BuddyStatusID===4)  {
      StatusString="REMOVED";
    } else if (BuddyStatusID===5)  {
      StatusString="BANNED";
    } else {
      StatusString="N/A";
    }
    const confirmChange = await this.alertCtrl.create({ 
      header: 'Change status', 
      message: 'Do you want to change status of this buddy? <p><b>'+BuddyFirstName+' '+BuddyLastName
        +'</b></p>Buddy ID: '+BuddyID+' change from <b>'+StatusString+'</b> to <b>BANNED</b>', 
      buttons: [
      { 
        text: 'Change',
        role: 'Change', 
        handler: () => {  
          this.apiDataService.getRe2Ba(BuddyID).subscribe(
            result=>{
              this.BuddyInfo=result;
            }
          );
        } 
      }, { 
        text: 'Cancel', 
        role: 'Cancel',
        handler: () => { 
        } 
      }] 
    }); 
    await confirmChange.present(); 
  } 
  /* ------------------------------------------------------------------------------------------------------------ */
}
