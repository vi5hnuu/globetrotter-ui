import { Component } from '@angular/core';
import {AvatarComponent} from "./components/avatar/avatar.component";
import {AuthService} from "./services/auth-service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'globetrotter';

  constructor(public authService:AuthService) {}
}
