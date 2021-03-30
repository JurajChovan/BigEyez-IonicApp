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
    /* JCHO: ak pou��vam iba lok�lny asset s potrebn�mi JSON datami: */
    // return this.http.get("../../assets/data/APIdata.json");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vyp�e info/profil "prihl�senen�ho" pou��vate�a: */
  getUserProfile()  {
    return this.http.get(`${this.URL}`+"TUser");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vyp�e info o v�etk�ch akceptovan�ch "buddies" "prihl�senen�ho" pou��vate�a: */
  getAllAcBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TAcUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vyp�e info o v�etk�ch zabanovan�ch "buddies" "prihl�senen�ho" pou��vate�a: */
  getAllBaBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TBaUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vyp�e info o v�etk�ch odstranen�ch "buddies" "prihl�senen�ho" pou��vate�a: */
  getAllReBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TReUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vyp�e info o v�etk�ch �akaj�cich "buddies" prihl�senen�ho pou��vate�a: */
  getAllWaBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TWaUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vyp�e info o v�etk�ch "buddies" prihl�senen�ho pou��vate�a: */
  getAllBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* profil buddieho (prihl�sen�ho pou��vate�a) (v�etky data aj GPS): */
  getBuddyInfo(BuddyID: string) {
    return this.http.get(`${this.URL}`+"TUser/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vyp�e info o v�etk�ch "buddies", ktor� maj� na zozname prihl�senen�ho pou��vate�a: */
  getAllMeBuddiesInfo() {
    return this.http.get(`${this.URL}`+"TMeUsers");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vyp�e v�etky tagy prihl�senen�ho pou��vate�a: */
  getAllUserTags() {
    return this.http.get(`${this.URL}`+"TTags");
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: zma�e existuj�ci tag u prihl�senen�ho pou��vate�a: */
  deleteTag(TagID: number) {
    return this.http.delete(`${this.URL}`+"TTag/"+TagID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: aktualizuje existuj�ci tag u prihl�senen�ho pou��vate�a: */
  updateTag(TagID: number, Tag: string) {
    return this.http.put(`${this.URL}`+"TTag/"+TagID, {Tag: Tag});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vlo�� nov� tag u prihl�senen�ho pou��vate�a: */
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
  /* JCHO: zma�e existuj�ceho buddy-ho u prihl�senen�ho pou��vate�a: */
  deleteBuddy(BuddyID: number)  {
    return this.http.delete(`${this.URL}`+"TUser/"+BuddyID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: aktualizuje GPS poziciu u prihl�senen�ho pou��vate�a: */
  updateGPSPos(currentLat: number, currentLng: number) {
    return this.http.put(`${this.URL}`+"TGPSPos", {Lat: currentLat, Lng: currentLng});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vyp�e v�etk�ch pou��vate�ov (nielen "buddies"), ktor� maj� ur�en� tag a s� v definovanom priestore okolo prihl�senen�ho pou��vate�a: */
  getAllUsersWithTag(foundTag: string, inDistanceOf: number)  {
    return this.http.get(`${this.URL}`+"TTag/"+foundTag+'/'+inDistanceOf);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* z�kladn� info usera (iba GPS): */
  getUserBasicInfo(UserID: string) {
    return this.http.get(`${this.URL}`+"TUBI/"+UserID);
  }
  /* ------------------------------------------------------------------------------------------------------------ */
  /* JCHO: vlo�� nov� vz�ah prihl�senen�ho pou��vate�a na vybrat�ho user-a: */
  askUser(UserID: number) {
    return this.http.post(`${this.URL}`+"TAsk", {UserID: UserID});
  }
  /* ------------------------------------------------------------------------------------------------------------ */
}
