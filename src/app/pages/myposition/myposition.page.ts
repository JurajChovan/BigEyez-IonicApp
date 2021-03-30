/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
import * as Parameters from '../../components/configuration/configuration';
/* ------------------------------------------------------------------------------------------------------------ */
declare var H;
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-myposition',
  templateUrl: './myposition.page.html',
  styleUrls: ['./myposition.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class MypositionPage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  platform: any;
  map: any;
  hereMapApiKey: string;
  Profile = null;
  results: Observable<any>;
  /* ------------------------------------------------------------------------------------------------------------ */
  constructor(private apiDataService: APIdataService) {
    this.hereMapApiKey=Parameters.Cnfg.HEREMapApiKey;
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    setTimeout(() => {
      this.apiDataService.getUserProfile().subscribe(result=>{
        this.Profile=result;
      });
    }, 2000);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  ionViewDidEnter()  {
    var totoCele = this;
    setTimeout(function(){
      this.platform = new H.service.Platform({
        'apikey': totoCele.hereMapApiKey
      });
      var maptypes = this.platform.createDefaultLayers();
      this.map = new H.Map(
        document.getElementById('mapContainer'), maptypes.raster.normal.map,
        {
          zoom: 15,
          center: { lat: totoCele.Profile.Lat, lng: totoCele.Profile.Lng } 
        });
      // toto vracia chybu CORS:
      // http://bigeyez/public/{{ Profile?.Location }}/{{ Profile?.FileName }}
      // var defaultIcon = new H.map.Icon("http://bigeyez/public/"+totoCele.Profile.Location+'/'+totoCele.Profile.FileName, { size: { w: 30, h: 30 } });
      var defaultIcon = new H.map.Icon(Parameters.Cnfg.LoggedUserMarkerFile, { size: { w: 22, h: 40 } });
      var LoggedUserMarker = new H.map.Marker({ lat: totoCele.Profile.Lat, lng: totoCele.Profile.Lng },{ icon: defaultIcon });
      this.map.addObject(LoggedUserMarker);
      var ui = H.ui.UI.createDefault(this.map, maptypes);
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    },2000);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: aktualizuje GPS poziciu prihláseneného používate¾a: */
  UpdateGPSPos()  {
    console.log('Press Update GPS Position');
    // ToDo:
    // namiesto nasledujúceho doplni zistenie GPS polohy z device senzorov (cez Cordovu/Capacitor):
    var CurrentLatitude: number = 48.7211982000099;
    var CurrentLongitude: number = 21.1977677000099;
    // JCHO: volá servis, ktorý vymaže vybratý Tag:
    this.apiDataService.updateGPSPos(CurrentLatitude,CurrentLongitude).subscribe(result=>{
    });
    // refresh-ne stranku:
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
