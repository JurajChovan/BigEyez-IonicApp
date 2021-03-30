/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as Parameters from '../../components/configuration/configuration';
import { CommonFunctionsService } from '../../services/common-functions.service';
/* ------------------------------------------------------------------------------------------------------------ */
declare var H;
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-userposition',
  templateUrl: './userposition.page.html',
  styleUrls: ['./userposition.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class UserpositionPage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  platform: any;
  map: any;
  hereMapApiKey: string;
  UserInfo = null;
  results: Observable<any>;
  /* ------------------------------------------------------------------------------------------------------------ */
  constructor(
    private apiDataService: APIdataService,
    private commonFunctionsService: CommonFunctionsService,
    private route: ActivatedRoute,
    ) {
      this.hereMapApiKey=Parameters.Cnfg.HEREMapApiKey;
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      if (!paramMap.has('UserID')) {
        console.log('nie je UserID');
        return;
      }
      const UserID=paramMap.get('UserID');
      this.apiDataService.getUserBasicInfo(UserID).subscribe(
        result=>{
          this.UserInfo=result;
          var DateLastUpdate: any = new Date(this.UserInfo.LastUpdate);
          var DateNow: any = new Date();
          var DateDifference = Math.floor((DateNow - DateLastUpdate) / (24 * 3600 * 1000));
          this.UserInfo.DateDiffInDays=DateDifference;
        }
      );
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  ionViewDidEnter()  {
    // vypocita GPS suradnicu na vycentrovanie zobrazenej mapy a zoom level:
    var CenterPositionAndZoom=this.commonFunctionsService.GetMapCenterPositionAndZoom(
      this.UserInfo.LoggedUserLatitude,
      this.UserInfo.LoggedUserLongitude,
      this.UserInfo.Lat,
      this.UserInfo.Lng);
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
      var UserIcon = new H.map.Icon(Parameters.Cnfg.UnknownUserMarkerFile, { size: { w: 22, h: 40 } });
      var UserMarker = new H.map.Marker({ lat: totoCele.UserInfo.Lat, lng: totoCele.UserInfo.Lng },{ icon: UserIcon });
      this.map.addObject(UserMarker);
      var LoggedUserIcon = new H.map.Icon(Parameters.Cnfg.LoggedUserMarkerFile, { size: { w: 22, h: 40 } });
      var LoggedUserMarker = new H.map.Marker({ lat: totoCele.UserInfo.LoggedUserLatitude, lng: totoCele.UserInfo.LoggedUserLongitude },{ icon: LoggedUserIcon });
      this.map.addObject(LoggedUserMarker);
      var ui = H.ui.UI.createDefault(this.map, maptypes);
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    },2000);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
