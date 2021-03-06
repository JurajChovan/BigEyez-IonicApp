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
    /* JCHO: ak pouźívam iba lokálny asset s potrebnými JSON datami: */
    // return this.http.get("../../assets/data/APIdata.json");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info/profil "prihláseneného" používateľa: */
  getUserProfile()  {
    return this.http.get(`${this.URL}`+"TUser");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkých akceptovaných "buddies" "prihláseneného" používateľa: */
  getAllAcBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TAcUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkých zabanovaných "buddies" "prihláseneného" používateľa: */
  getAllBaBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TBaUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkých odstranených "buddies" "prihláseneného" používateľa: */
  getAllReBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TReUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkých čakajúcich "buddies" prihláseneného používateľa: */
  getAllWaBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TWaUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkých "buddies" prihláseneného používateľa: */
  getAllBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* profil buddieho (prihláseného používateľa) (všetky data aj GPS): */
  getBuddyInfo(BuddyID: string) {
    return this.http.get(`${this.URL}`+"TUser/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše info o všetkých "buddies", ktorí majú na zozname prihláseneného používateľa: */
  getAllMeBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TMeUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše všetky tagy prihláseneného používateľa: */
  getAllUserTags() {
    return this.http.get(`${this.URL}`+"TTags");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zmaže existujúci tag u prihláseneného používateľa: */
  deleteTag(TagID: number) {
    return this.http.delete(`${this.URL}`+"TTag/"+TagID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: aktualizuje existujúci tag u prihláseneného používateľa: */
  updateTag(TagID: number, Tag: string) {
    return this.http.put(`${this.URL}`+"TTag/"+TagID, {Tag: Tag});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vloží nový tag u prihláseneného používateľa: */
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
  /* JCHO: zmaže existujúceho buddy-ho u prihláseneného používateľa: */
  deleteBuddy(BuddyID: number)  {
    return this.http.delete(`${this.URL}`+"TUser/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: aktualizuje GPS poziciu u prihláseneného používateľa: */
  updateGPSPos(currentLat: number, currentLng: number) {
    return this.http.put(`${this.URL}`+"TGPSPos", {Lat: currentLat, Lng: currentLng});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vypíše všetkých používateľov (nielen "buddies"), ktorí majú určený tag a sú v definovanom priestore okolo prihláseneného používateľa: */
  getAllUsersWithTag(foundTag: string, inDistanceOf: number)  {
    return this.http.get(`${this.URL}`+"TTag/"+foundTag+'/'+inDistanceOf);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* základné info usera (iba GPS): */
  getUserBasicInfo(UserID: string) {
    return this.http.get(`${this.URL}`+"TUBI/"+UserID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vloží nový vzťah prihláseneného používateľa na vybratého user-a: */
  askUser(UserID: number) {
    return this.http.post(`${this.URL}`+"TAsk", {UserID: UserID});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
