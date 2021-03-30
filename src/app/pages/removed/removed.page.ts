/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-removed',
  templateUrl: './removed.page.html',
  styleUrls: ['./removed.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class RemovedPage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  ReUsers = null;
  results: Observable<any>;
  constructor(private apiDataService: APIdataService) {}
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.apiDataService.getAllReBuddiesInfo().subscribe(result=>{
      this.ReUsers=result;
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
