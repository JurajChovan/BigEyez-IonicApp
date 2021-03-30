/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class MePage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  AllMeBuddies = null;
  results: Observable<any>;
  constructor(private apiDataService: APIdataService,
    public alertCtrl: AlertController) {}
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.apiDataService.getAllMeBuddiesInfo().subscribe(result=>{
      this.AllMeBuddies=result;
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Confirm" ak chce zmazaù seba u vybratÈho buddy-ho: */
  async showConfirmToDeleteMe(UserID, BuddyFirstName, BuddyLastName) { 
    const confirmDelete = await this.alertCtrl.create({ 
      header: 'Delete me on list', 
      message: 'Do you really want to delete yourself in list of user? <p><b>'+BuddyFirstName+' '+BuddyLastName
        +'</b></p> (id: '+UserID+')', 
      buttons: [
      { 
        text: 'Delete',
        role: 'Delete', 
        handler: () => {  
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
}
