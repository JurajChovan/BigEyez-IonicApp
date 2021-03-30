/* ------------------------------------------------------------------------------------------------------------ */
import { Component, OnInit } from '@angular/core';
import { APIdataService } from '../../services/apidata.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
/* ------------------------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-searchbytag',
  templateUrl: './searchbytag.page.html',
  styleUrls: ['./searchbytag.page.scss'],
})
/* ------------------------------------------------------------------------------------------------------------ */
export class SearchbytagPage implements OnInit {
  /* ------------------------------------------------------------------------------------------------------------ */
  ionicForm: FormGroup;
  inDistanceOfValue = '1 km';
  isSubmitted = false;
  results: Observable<any>;
  UsersWithTag = null;
  /* ------------------------------------------------------------------------------------------------------------ */
  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    private apiDataService: APIdataService
  ) { }
  /* ------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      searchText: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      toDistance: ['', [Validators.required]],
    });
   }
  /* ------------------------------------------------------------------------------------------------------------ */
  ionViewDidEnter()  {
    // nastavi hodnotu do formularoveho radio:
    this.ionicForm.controls['toDistance'].setValue(this.inDistanceOfValue);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  get errorControl() {
    return this.ionicForm.controls;
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      var distanceString = this.ionicForm.controls['toDistance'].value;
      var distanceValue = 1000;
      if (distanceString==='50 m')  {
        distanceValue = 50;
      } else if (distanceString==='100 m') {
        distanceValue = 100;
      } else if (distanceString==='500 m') {
        distanceValue = 500;
      } else if (distanceString==='1 km') {
        distanceValue = 1000;
      } else if (distanceString==='2 km') {
        distanceValue = 2000;
      } else if (distanceString==='5 km') {
        distanceValue = 5000;
      } else if (distanceString==='20 km') {
        distanceValue = 20000;
      } else if (distanceString==='100 km') {
        distanceValue = 100000;
      } else {
        distanceValue = 1000;
      }
      var link = 'http://127.0.0.1:8000/api/'+this.ionicForm.controls['searchText'].value
        +'/'+distanceValue;
      // JCHO: vol· servis, ktor˝ ...:
      this.apiDataService.getAllUsersWithTag(this.ionicForm.controls['searchText'].value,distanceValue).subscribe(result=>{
        this.UsersWithTag=result;
      });
    }
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Alert" na vyber jednej z hodnot: */
  async showRadioAlert() {
    const alert = await this.alertCtrl.create({
      header: 'In distance of',
      inputs: [
        {
          name: 'opt50',
          type: 'radio',
          label: '50 m',
          value: '50',
        },
        {
          name: 'opt100',
          type: 'radio',
          label: '100 m',
          value: '100'
        },
        {
          name: 'opt500',
          type: 'radio',
          label: '500 m',
          value: '500'
        },
        {
          name: 'opt1000',
          type: 'radio',
          label: '1 km',
          value: '1000',
          checked: true
        },
        {
          name: 'opt2000',
          type: 'radio',
          label: '2 km',
          value: '2000'
        },
        {
          name: 'opt5000',
          type: 'radio',
          label: '5 km',
          value: '5000'
        },
        {
          name: 'opt20000',
          type: 'radio',
          label: '20 km',
          value: '20000'
        },
        {
          name: 'opt100000',
          type: 'radio',
          label: '100 km',
          value: '100000'
        }
      ],
      buttons: [
        {
          text: 'Select', 
          handler: data => { 
            if (data==='50') { this.inDistanceOfValue='50 m' }
            else if (data==='100') { this.inDistanceOfValue='100 m' }
            else if (data==='500') { this.inDistanceOfValue='500 m' }
            else if (data==='1000') { this.inDistanceOfValue='1 km' }
            else if (data==='2000') { this.inDistanceOfValue='2 km' }
            else if (data==='5000') { this.inDistanceOfValue='5 km' }
            else if (data==='20000') { this.inDistanceOfValue='20 km' }
            else if (data==='100000') { this.inDistanceOfValue='100 km' }
            else { this.inDistanceOfValue='1km' }
          } 
        }, {
          text: 'Cancel',  
          handler: data => { 
          } 
        }
      ]
    });
      await alert.present();
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: mod·lne okno "Confirm" ak chce poslaù ûiadosù pouûÌvateæovi: */
  async showConfirmToAskBuddy(UserID, UserName) { 
    const confirmAsk = await this.alertCtrl.create({ 
      header: 'Ask user', 
      message: 'Do you really want to be in relationship with? <p><b>'+UserName+'</b>', 
      buttons: [
      { 
        text: 'Ask',
        role: 'Ask', 
        handler: () => {  
          // JCHO: vol· servis, ktor˝ poûiada vybratÈho user-a o priateæstvo:
          this.apiDataService.askUser(UserID).subscribe(result=>{
          });
        } 
      }, { 
        text: 'Cancel', 
        role: 'Cancel',
        handler: () => { 
        } 
      }] 
    }); 
    await confirmAsk.present(); 
  } 
  /* ------------------------------------------------------------------------------------------------------------ */
}
