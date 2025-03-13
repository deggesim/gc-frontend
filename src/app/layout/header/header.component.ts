import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  PRIMARY_OUTLET,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import {
  BsDropdownDirective,
  BsDropdownMenuDirective,
  BsDropdownToggleDirective,
} from 'ngx-bootstrap/dropdown';
import { filter } from 'rxjs/operators';
import { ThemeService } from 'src/app/shared/theme.service';
import { AuthService } from '../../services/auth.service';

interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
  selector: 'gc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLink,
    FaIconComponent,
    NgIf,
    CollapseDirective,
    BsDropdownDirective,
    BsDropdownToggleDirective,
    BsDropdownMenuDirective,
    RouterLinkActive,
    NgFor,
    AsyncPipe,
  ],
})
export class HeaderComponent implements OnInit {
  @Output() logout: EventEmitter<void> = new EventEmitter(true);
  @Output() profile: EventEmitter<void> = new EventEmitter(true);

  themeIcon = 'sun';
  isCollapsed = true;
  breadcrumbs: IBreadcrumb[] = [];

  isLoggedIn$ = this.authService.isLoggedIn();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // subscribe to the NavigationEnd event
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // set breadcrumbs
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadcrumb[] = []
  ): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    // get the child routes
    const children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      // append route URL to URL
      url += `/${routeURL}`;

      // add breadcrumb
      const breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url,
      };
      breadcrumbs.push(breadcrumb);

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    // we should never get here, but just in case
    return breadcrumbs;
  }

  toggleTheme = () => {
    const newTheme =
      this.themeService.getTheme() === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
    this.themeIcon = newTheme === 'light' ? 'moon' : 'sun';
  };
}
