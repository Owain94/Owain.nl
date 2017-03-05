import { MouseEvent } from 'angular2-google-maps/core';
import { DocumentRef } from 'angular2-google-maps/core/utils/browser-globals';
import { Event } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  // tslint:disable-next-line:no-inferrable-types
  public color: boolean = false;

  @HostListener('window:scroll', ['$event'])
  public onScroll(event: any) {
    if (((typeof(event.pageY) !== 'undefined' && Number(event.pageY) >= 100) ||
       (typeof(event.view) !== 'undefined' && Number(event.view.document.body.scrollTop) >= 100) ||
       (typeof(event.target) !== 'undefined' && Number(event.target.body.scrollTop) >= 100))) {
      this.color = true;
    } else if (((typeof(event.pageY) !== 'undefined' && Number(event.pageY) < 100) ||
              (typeof(event.view) !== 'undefined' && Number(event.view.document.body.scrollTop) < 100) ||
              (typeof(event.target) !== 'undefined' && Number(event.target.body.scrollTop) < 100))) {
      this.color = false;
    }
  }

  public menuClick(event: any, id: string) {
    this.scrollTo(id, 500, event.view, event.view.document);
  }

  private scrollTo(element: string, duration: number, windowRef: any, documentRef: any) {
    const startingY = windowRef.pageYOffset;
    const elementY = windowRef.pageYOffset + documentRef.querySelector(element).getBoundingClientRect().top;
    // If element is close to page's bottom then windowRef will scroll only to some position above the element.
    const targetY = documentRef.body.scrollHeight - elementY < windowRef.innerHeight ?
      documentRef.body.scrollHeight - windowRef.innerHeight :
      elementY;
    const diff = targetY - 50 - startingY;

    const easing = (t) => {
      return t < .5 ? 4 * t * t * t : (t  - 1)  * (2 * t - 2)  *  (2 * t - 2) + 1;
    };

    let start;

    if (!diff) {
      return;
    }

    windowRef.requestAnimationFrame(function step(timestamp) {
      if (!start) {
        start = timestamp;
      }
      // Elapsed miliseconds since start of scrolling.
      const time = timestamp - start;
      // Get percent of completion in range [0, 1].
      let percent = Math.min(time / duration, 1);
      // Apply the easing.
      // It can cause bad-looking slow frames in browser performance tool, so be careful.
      percent = easing(percent);

      windowRef.scrollTo(0, startingY + diff * percent);

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        windowRef.requestAnimationFrame(step);
      }
    });
  }
}
