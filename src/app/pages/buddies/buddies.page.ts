/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-buddies',
  templateUrl: './buddies.page.html',
  styleUrls: ['./buddies.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class BuddiesPage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  AllBuddies = null;
  results: Observable<any>;
  constructor(private apiDataService: APIdataService) {}
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.apiDataService.getAllBuddiesInfo().subscribe(result=>{
      this.AllBuddies=result;
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
