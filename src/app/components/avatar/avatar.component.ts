import {Component, Input} from '@angular/core';

@Component({
  standalone:true,
  selector: 'gt-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() seed: string='Felix';
}
