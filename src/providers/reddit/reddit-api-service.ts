import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const BASE_URL: string =  'https://www.reddit.com/';
const JSON_POSTFIX: string = '.json';

@Injectable()
export class RedditApiService {

  constructor(public http: Http) {}

  fetch(url?: string) {
    return url ?
      this.http.get(BASE_URL + '/r/' + url + JSON_POSTFIX)
        .map(this.redditCollectionToJson) :
      this.http.get(BASE_URL + JSON_POSTFIX)
        .map(this.redditCollectionToJson)
  }

  fetchNext(lastPostName: string, url?: string) {
    return url ?
      this.http.get(BASE_URL + '/r/' + url + JSON_POSTFIX + '?count=' + 25 + '&after=' + lastPostName)
        .map(this.redditCollectionToJson) :
      this.http.get(BASE_URL + JSON_POSTFIX + '?count=' + 25 + '&after=' + lastPostName)
        .map(this.redditCollectionToJson)
  }

  fetchComments(post) {
    let url: string = BASE_URL + post.permalink + JSON_POSTFIX;
    return this.http.get(url)
      .map(res => res.json()[1].data.children.map(c => c.data).filter(c => c.body))
      .map(this.beautifyReplies.bind(this))
  }

  beautifyReplies(comments) {
    return comments.map(comment => {
      comment.replies = comment.replies ? comment.replies.data.children.map(reply => reply.data).filter(c => c.body) : [];
      this.beautifyReplies(comment.replies);
      return comment;
    })
  }

  redditCollectionToJson(response) {
    return response.json().data.children.map(c => c.data)
  }
}
