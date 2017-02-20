export class Page {
    public slug: string;
    public html: string;
    public keywords: string;
    public pages: string[];
    public title: string;

    constructor(slug, html, keywords, pages, title){
        this.slug = slug;
        this.html = html;
        this.keywords = keywords;
        this.pages = pages;
        this.title = title;
    }

}