/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.page.html',
  styleUrls: ['./accepted.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class AcceptedPage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  AcUsers = null;
  results: Observable<any>;
  constructor(private apiDataService: APIdataService) {}
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.apiDataService.getAllAcBuddiesInfo().subscribe(result=>{
      this.AcUsers=result;
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
