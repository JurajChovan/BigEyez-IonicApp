/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class HomePage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  information = null;
  results: Observable<any>;
  constructor(private apiDataService: APIdataService) {}
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.apiDataService.getDbInfo().subscribe(result=>{
      var OutputText: string=result[0].Stat+' '+result[1].Stat+' '+result[2].Stat;
      this.information=OutputText;
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
