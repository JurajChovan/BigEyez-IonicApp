/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-waited',
  templateUrl: './waited.page.html',
  styleUrls: ['./waited.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class WaitedPage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  WaUsers = null;
  results: Observable<any>;
  constructor(private apiDataService: APIdataService) {}
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.apiDataService.getAllWaBuddiesInfo().subscribe(result=>{
      this.WaUsers=result;
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
