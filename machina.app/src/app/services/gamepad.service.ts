import { Injectable } from '@angular/core';

@Injectable()
export class GamepadService {
  gamepad: Gamepad;
  timestamp: number;
  axis0: number;
  axis1: number;
  axis2: number;
  axis3: number;
  a: number;
  b: number;
  x: number;
  y: number;
  lb: number;
  rb: number;

  constructor() {
    // this.gamepad = navigator.getGamepads()[1];
    // console.log(this.gamepad);
    // this.setGamepadValues();
  }

  setGamepadValues() {
    this.gamepad = navigator.getGamepads()[1];
    this.timestamp = this.gamepad.timestamp;
    this.axis0 = this.gamepad.axes[0];
    this.axis1 = this.gamepad.axes[1];
    this.axis2 = this.gamepad.axes[2];
    this.axis3 = this.gamepad.axes[3];
    // this.gamepadValues.a = this.gamepad.buttons[0];
    // this.gamepadValues.b = this.gamepad.buttons[1];
    // this.gamepadValues.x = this.gamepad.buttons[2];
    // this.gamepadValues.y = this.gamepad.buttons[3];
    // this.gamepadValues.lb = this.gamepad.buttons[6];
    // this.gamepadValues.rb = this.gamepad.buttons[7];

    requestAnimationFrame(() => { this.setGamepadValues(); });
  }
}
