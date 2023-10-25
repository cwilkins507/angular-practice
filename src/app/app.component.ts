import {Component} from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand">{{pageTitle}}</a>
      <ul class='nav nav-pills'>
        <!--    router can uses array to find the path and any parameters but not necessary-->
<!--      add the routerLink directive as an attribute, identify where to display and which host's template-->
        <li><a class='nav-link' routerLink="/welcome">Home</a></li>
        <li><a class='nav-link' routerLink="/products">Product List</a></li>
      </ul>
    </nav>
    <div class="container">
    <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}
