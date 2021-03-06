import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PageService} from 'app/page.service';

// import {TranslateService} from 'ng2-translate';
import {AuthGuard} from 'app/services/auth.guard';
import {TranslateService} from 'app/translate/translate.service';


@Component({
  selector: 'header.app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit, AfterViewInit {


  listUrl: any[] = [];
  activeUrl: any = {};
  showMenu: Boolean = false;
  imageUrl: string = 'assets/images/icons/default.svg';

  constructor(
    private router: Router,
    private pageService: PageService,
    // private translate: TranslateService,
    private authGuard: AuthGuard,
    private activatedRoute: ActivatedRoute,
    private _translate: TranslateService,
  ) {

  }


  defaultImage(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    target.src = this.imageUrl;
  }

  toggleMenuVisible(disable: Boolean) {
    this.showMenu = !this.showMenu;
    if (disable == true) {
      this.showMenu == false;
    }
  }


  ngOnInit() {
    let currentLang = this._translate.currentLang.toLocaleLowerCase();
    this.pageService.getPageList()
      .subscribe(page => {
        page.pages
          .forEach(element => {
            if (element.pages.length) {
              let array: any[] = [];
              element.pages.forEach(element => {

                // _translate.translate();

                array.push({
                  url: element.slug,
                  title: currentLang === 'ru' ? element.title ? element.title : element.slug : element.title_en ? element.title_en : element.slug,
                  type: element.type
                });
              });
              this.listUrl.push({
                url: element.slug,
                title: currentLang === 'ru' ? element.title ? element.title : element.slug : element.title_en ? element.title_en : element.slug,
                underpage: array,
                type: element.type
              })
            } else {
              if (element.slug == 'login' && this.authGuard.is_logged()) {
                this.listUrl.push({url: 'profile/my', title: this._translate.instant('profile_label')});
                /* Сслыка на профиль */
              } else {
                this.listUrl.push({
                  url: element.slug,
                  title: currentLang === 'ru' ? element.title ? element.title : element.slug : element.title_en ? element.title_en : element.slug,
                  underpage: false,
                  type: element.type
                })
              }
            }
          });

        this.activeUrl = this.listUrl.filter(item => item.url == this.router.url.split('/')[1])[0];

      });
    this.subscribeToLangChanged();
  }

  refreshPage() {
    window.location.reload();
  }

  subscribeToLangChanged() {
    return this._translate.onLangChanged.subscribe(x => this.refreshPage());
  }

  ngAfterViewInit() {
    if (window.location.hash) {
      this.goTo(window.location.hash.replace('#', ''));
    }
  }

  goTo(location: string): void {

    if (document.getElementById(location) != null) {
      history.pushState(null, null, window.location.pathname + '#' + location);
      window.scrollTo(0, document.getElementById(location).getBoundingClientRect().top);
    }
  }

}
