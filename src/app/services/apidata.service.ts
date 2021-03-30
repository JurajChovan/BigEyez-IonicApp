/* ------------------------------------------------------------------------------------------------------------ */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import * as Parameters from '../components/configuration/configuration';
/* ------------------------------------------------------------------------------------------------------------ */
@Injectable({
  providedIn: 'root'
})
/* ------------------------------------------------------------------------------------------------------------ */
export class APIdataService {
  /* ------------------------------------------------------------------------------------------------------------ */
  URL = Parameters.Cnfg.URL;
  /* ------------------------------------------------------------------------------------------------------------ */
  constructor(
    private http: HttpClient
    )  {  }
  /* ------------------------------------------------------------------------------------------------------------ */
  getDbInfo() {
    /* JCHO: toto nefunguje */
    return this.http.get(`${this.URL}`+"TGetDbInfo");
    /* JCHO: toto funguje */
    // return this.http.get(`https://jsonplaceholder.typicode.com/todos/1`);
    /* JCHO: ak pouŸívam iba lokálny asset s potrebnımi JSON datami: */
    // return this.http.get("../../assets/data/APIdata.json");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info/profil "prihláseneného" pouívate¾a: */
  getUserProfile()  {
    return this.http.get(`${this.URL}`+"TUser");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkıch akceptovanıch "buddies" "prihláseneného" pouívate¾a: */
  getAllAcBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TAcUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkıch zabanovanıch "buddies" "prihláseneného" pouívate¾a: */
  getAllBaBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TBaUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkıch odstranenıch "buddies" "prihláseneného" pouívate¾a: */
  getAllReBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TReUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkıch èakajúcich "buddies" prihláseneného pouívate¾a: */
  getAllWaBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TWaUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkıch "buddies" prihláseneného pouívate¾a: */
  getAllBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* profil buddieho (prihláseného pouívate¾a) (všetky data aj GPS): */
  getBuddyInfo(BuddyID: string) {
    return this.http.get(`${this.URL}`+"TUser/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkıch "buddies", ktorí majú na zozname prihláseneného pouívate¾a: */
  getAllMeBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TMeUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše všetky tagy prihláseneného pouívate¾a: */
  getAllUserTags() {
    return this.http.get(`${this.URL}`+"TTags");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmae existujúci tag u prihláseneného pouívate¾a: */
  deleteTag(TagID: number) {
    return this.http.delete(`${this.URL}`+"TTag/"+TagID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: aktualizuje existujúci tag u prihláseneného pouívate¾a: */
  updateTag(TagID: number, Tag: string) {
    return this.http.put(`${this.URL}`+"TTag/"+TagID, {Tag: Tag});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vloí novı tag u prihláseneného pouívate¾a: */
  createTag(Tag: string) {
    return this.http.post(`${this.URL}`+"TNewTag", {Tag: Tag});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmena stavu buddy-ho z "accepted" na "waited": */
  getAc2Wa(BuddyID: number)  { 
    return this.http.get(`${this.URL}`+"TAc2Wa/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmena stavu buddy-ho z "accepted" na "removed": */
  getAc2Re(BuddyID: number) {
    return this.http.get(`${this.URL}`+"TAc2Re/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmena stavu buddy-ho z "waited" na "accepted": */
  getWa2Ac(BuddyID: number) {
    return this.http.get(`${this.URL}`+"TWa2Ac/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmena stavu buddy-ho z "waited" na "removed": */
  getWa2Re(BuddyID: number) {
    return this.http.get(`${this.URL}`+"TWa2Re/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmena stavu buddy-ho z "removed" na "waited": */
  getRe2Wa(BuddyID: number) {
    return this.http.get(`${this.URL}`+"TRe2Wa/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmena stavu buddy-ho z "removed" na "banned": */
  getRe2Ba(BuddyID: number) {
    return this.http.get(`${this.URL}`+"TRe2Ba/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmena stavu buddy-ho z "banned" na "waited": */
  getBa2Wa(BuddyID: number) {
    return this.http.get(`${this.URL}`+"TBa2Wa/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmae existujúceho buddy-ho u prihláseneného pouívate¾a: */
  deleteBuddy(BuddyID: number)  {
    return this.http.delete(`${this.URL}`+"TUser/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: aktualizuje GPS poziciu u prihláseneného pouívate¾a: */
  updateGPSPos(currentLat: number, currentLng: number) {
    return this.http.put(`${this.URL}`+"TGPSPos", {Lat: currentLat, Lng: currentLng});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše všetkıch pouívate¾ov (nielen "buddies"), ktorí majú urèenı tag a sú v definovanom priestore okolo prihláseneného pouívate¾a: */
  getAllUsersWithTag(foundTag: string, inDistanceOf: number)  {
    return this.http.get(`${this.URL}`+"TTag/"+foundTag+'/'+inDistanceOf);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* základné info usera (iba GPS): */
  getUserBasicInfo(UserID: string) {
    return this.http.get(`${this.URL}`+"TUBI/"+UserID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vloí novı vzah prihláseneného pouívate¾a na vybratého user-a: */
  askUser(UserID: number) {
    return this.http.post(`${this.URL}`+"TAsk", {UserID: UserID});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
