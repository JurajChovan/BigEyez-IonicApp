import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Profile', url: 'profile', icon: 'person-circle' },
    { title: 'All buddies', url: 'buddies', icon: 'people-circle' },
    { title: 'Accepted', url: 'accepted', icon: 'people-circle' },
    { title: 'Waited', url: 'waited', icon: 'people-circle' },
    { title: 'Removed', url: 'removed', icon: 'people-circle' },
    { title: 'Banned', url: 'banned', icon: 'people-circle' },
    { title: 'Tags', url: 'mytags', icon: 'pricetags' },
    { title: 'Me on lists', url: 'me', icon: 'information-circle' },
    { title: 'Position', url: 'myposition', icon: 'locate' },
    { title: 'Search', url: 'searchbytag', icon: 'search' },
  ];
  constructor() {}
}
