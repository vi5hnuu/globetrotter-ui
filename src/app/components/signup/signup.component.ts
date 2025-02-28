import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";

@Component({
  standalone: true,
  selector: 'gt-signup',
  templateUrl: './signup.component.html',
  imports: [
    MatCardModule
  ],
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

}
