import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  listUrl: any[] = [
    {
      url:"home", title:"Главная страница", 
      child:
        [
          {
            url:"home", title:"Главная страница 1"
          }, 
          {
            url:"home", title:"Главная страница 2"
          }
        ]
     },
    {url:"events", title:"Мероприятия"},
    {url:"constructor", title:"Конструктор"},
    {url:"calendar", title:"Календарь мероприятий"},
    {url:"contacts", title:"Контакты"},
  ]


  constructor(){}

  ngOnInit() {}
}
