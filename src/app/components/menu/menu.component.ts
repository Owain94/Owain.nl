import { Event } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  // tslint:disable-next-line:no-inferrable-types
  public color: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (!this.color && Number(event['path'][0]['body']['scrollTop']) >= 100) {
      this.color = true;
    } else if (this.color && Number(event['path'][0]['body']['scrollTop']) < 100) {
      this.color = false;
    }
  }
}
