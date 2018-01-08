import { Component } from '@angular/core';
import { GamepadService } from './services/gamepad.service';

@Component({
  selector: 'app-root',
  providers: [
    GamepadService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private gamepadService: GamepadService) { }

}
