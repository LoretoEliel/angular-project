import { Component, Input, HostBinding, ChangeDetectorRef, AfterViewInit, AfterContentInit, OnInit } from '@angular/core';
import { Router, RouteConfigLoadEnd, NavigationEnd } from '@angular/router';

@Component({
  selector: 'sidenav-router-link', // tslint:disable-line
  template: `
<a
  [routerLink]="route"
  [queryParams]="queryParams"
  [fragment]="fragment"
  [queryParamsHandling]="queryParamsHandling"
  [preserveFragment]="preserveFragment"
  [skipLocationChange]="skipLocationChange"
  [replaceUrl]="replaceUrl"
  class="sidenav-link"
  [ngClass]="linkClass">
  <i class="sidenav-icon" *ngIf="icon" [ngClass]="icon"></i>
  <div><ng-content></ng-content></div>
  <div *ngIf="badge" class="ml-auto pl-1"><div class="badge" [ngClass]="badgeClass">{{badge}}</div></div>
</a>
  `
})
export class SidenavRouterLinkComponent implements OnInit {
  constructor(public router: Router) { }

  ngOnInit() {
    /*
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activetest = (this.route === event.url);
        console.log(this.route === event.url, this.route, event.url);
      }
    });*/
   }

  @HostBinding('class.sidenav-item') private hostClassMain = true;
  @HostBinding('class.d-block') private hostClassBlock = true;

  @Input() icon: string;
  @Input() linkClass = '';
  @Input() badge: any = null;
  @Input() badgeClass = '';
  @Input() @HostBinding('class.disabled') disabled = false;
  @Input()  @HostBinding('class.active') active = false;

  @Input() route: string;
  @Input() queryParams: Object;
  @Input() fragment: string;
  @Input() queryParamsHandling: any;
  @Input() preserveFragment: boolean;
  @Input() skipLocationChange: boolean;
  @Input() replaceUrl: boolean;
}
