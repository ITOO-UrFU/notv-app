import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  listUrl: any[] = [
    {url:"home", title:"Главная страница"},
    {url:"events", title:"Мероприятия"},
    {url:"constructor", title:"Конструктор"},
    {url:"calendar", title:"Календарь мероприятий"},
    {url:"contacts", title:"Контакты"},
  ]

  constructor(){}

  ngOnInit() {}
}
