import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from 'app/events/events.service';
import {Router} from '@angular/router';
import {Event} from 'app/events/event';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from 'app/services/auth.guard';
import {RegisterService} from 'app/services/register.service';
import {AuthenticationService} from 'app/services/auth.service';

@Component({
  selector: 'div.app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent {
  @Input() current: Event;
}
