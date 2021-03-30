/* ------------------------------------------------------------------------------------------------------------ */
/* ToDo:
  1.) doplniù refresh str·nky po vymazanÌ nejakÈho Tagu
*/
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-mytags',
  templateUrl: './mytags.page.html',
  styleUrls: ['./mytags.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class MytagsPage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  AllTags = null;
  results: Observable<any>;
  dataReturned: any;
  /* ------------------------------------------------------------------------------------------------------------ */
  constructor(
    private apiDataService: APIdataService,
    public modalController: ModalController,
    public alertCtrl: AlertController) {}
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.apiDataService.getAllUserTags().subscribe(result=>{
      this.AllTags=result;
    });
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Confirm" ak chce zmazaù vybrat˝ Tag: */
  async showConfirmToDeleteTag(TagID, Tag) { 
    const confirmDelete = await this.alertCtrl.create({ 
      header: 'Delete tag', 
      message: 'Do you really want to delete this tag? <p><b>'+Tag+'</b></p> (id: '+TagID+')', 
      buttons: [
      { 
        text: 'Delete',
        role: 'Delete', 
        handler: () => {  
          // JCHO: vol· servis, ktor˝ vymaûe vybrat˝ Tag:
          this.apiDataService.deleteTag(TagID).subscribe(result=>{
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
  /* JCHO: mod·lne okno "Prompt" ak chce editovaù vybrat˝ Tag: */
  async showPromptToEditTag(TagID, Tag)  {
    const promptEdit = await this.alertCtrl.create({
      header: 'Edit tag', 
      message: 'You can edit this tag:', 
      inputs: [
        { 
          name: 'UpdatedTag', 
          type: 'text', 
          placeholder: Tag 
          }, 
      ], 
      buttons:  [
      { 
        text: 'Save', 
        handler: data => { 
          // JCHO: vol· servis, ktor˝ update-ne vybrat˝ Tag:
          this.apiDataService.updateTag(TagID,data.UpdatedTag).subscribe(result=>{
          });
        } 
      },
      { 
        text: 'Cancel',  
        handler: data => { 
        } 
      }]
    });
    await promptEdit.present();
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Prompt" ak chce pridaù nov˝ Tag: */
  async showModalToAddTag(Tag)  {
    const promptAdd = await this.alertCtrl.create({
      header: 'Add new tag', 
      message: 'You can add tag:', 
      inputs: [
        { 
          name: 'NewTag', 
          type: 'text', 
          placeholder: Tag 
          }, 
      ], 
      buttons:  [
      { 
        text: 'Add', 
        handler: data => { 
          // JCHO: vol· servis, ktor˝ vloûÌ nov˝ Tag:
          this.apiDataService.createTag(data.NewTag).subscribe(result=>{
          });
        } 
      },
      { 
        text: 'Cancel',  
        handler: data => { 
        } 
      }]
    });
    await promptAdd.present();
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
