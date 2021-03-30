/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-banned',
  templateUrl: './banned.page.html',
  styleUrls: ['./banned.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class BannedPage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  BaUsers = null;
  results: Observable<any>;
  constructor(private apiDataService: APIdataService) {}
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.apiDataService.getAllBaBuddiesInfo().subscribe(result=>{
      this.BaUsers=result;
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
