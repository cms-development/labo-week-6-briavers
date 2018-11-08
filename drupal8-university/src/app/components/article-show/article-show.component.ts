import { Component, OnInit } from '@angular/core';
import { HttpCallService } from 'src/app/services/http-call.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-article-show',
  templateUrl: './article-show.component.html',
  styleUrls: ['./article-show.component.scss']
})
export class ArticleShowComponent implements OnInit {

  public article;
  public date;
  constructor(
    private httpCall: HttpCallService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getArticles(id);

  }

  getArticles(id) {
    this.httpCall.getArticle(id).subscribe(
      data => {
        console.log(data)
        this.article = data;
        var myDate = new Date(this.article.data.attributes.created * 1000);
        this.date = myDate.toUTCString()
      },
      err => console.log(err),
      () => console.log('sended the request')
    )
  }
}
