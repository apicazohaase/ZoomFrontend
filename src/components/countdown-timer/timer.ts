import { Component, Input } from '@angular/core';

export interface CountdownTimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class Timer {

  @Input() timeInSeconds: number;
  timer: CountdownTimer;

  ngOnInit() {
    this.initTimer();
    this.startTimer();
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  initTimer() {
    if (!this.timeInSeconds) { this.timeInSeconds = 0; }

    this.timer = <CountdownTimer>{
      seconds: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  pauseTimer() {
    this.timer.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer) { return; }
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
      } else {
        this.timer.hasFinished = true;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param

    const days = Math.floor(secNum / 86400);
    const hours = Math.floor((secNum - (days * 86400)) / 3600);
    const minutes = Math.floor((secNum - (days * 86400) - (hours * 3600)) / 60);
    const seconds = secNum - (days * 86400) - (hours * 3600) - (minutes * 60);

    let daysString = '';
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    //daysString = (days < 10) ? '0' + days : days.toString();
    daysString = (days < 1) ? '' : days.toString() + "d ";

    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return daysString + hoursString + ':' + minutesString + ':' + secondsString;
  }

}
