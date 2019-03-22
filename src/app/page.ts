export class Page {
    public slug: string;
    public html: string;
    public keywords: string;
    public pages: string[];
    public title: string;
    public type: string;
  public title_en: string;
  public html_en: string;

  constructor(slug, html, keywords, pages, title, type, title_en, html_en) {
        this.slug = slug;
        this.html = html;
        this.keywords = keywords;
        this.pages = pages;
        this.title = title;
        this.type = type;
    this.title_en = title_en;
    this.html_en = html_en;
    }

}
