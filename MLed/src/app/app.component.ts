import { Component, ɵɵcontainerRefreshEnd } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from './led';
import { LedsService } from './leds.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = '智能灯控';
  leds$: Observable<Device[]>;
  constructor(private ledService: LedsService) {

  }

  ngOnInit(): void {
    this.leds$ = <Observable<Device[]>>
      this.ledService.getLeds();
  }

  changeLed(led: Device) {

    this.ledService.changeLed(led.id, led.customer_status === 0 ? 1 : 0).subscribe((value: any) => {
      if (value.succ) {
        alert('修改成功');
      } else {
        alert('修改失败');
      }
      if (led.customer_status == 1) {
        led.customer_status = 0;
      } else {
        led.customer_status = 1;
      }
    });
  }
}