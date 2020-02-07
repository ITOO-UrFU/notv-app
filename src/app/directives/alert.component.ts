import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AlertService } from 'app/services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: './alert.component.html'
})

export class AlertComponent {
    message: any;
    // @Output() pleaseDeleteMeEvent = new EventEmitter();
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
  // private deleteMyself(): void {
  //   console.log("Self-delete button clicked ! Sending message to parent component...");
  //   this.pleaseDeleteMeEvent.emit();
  // }
}
