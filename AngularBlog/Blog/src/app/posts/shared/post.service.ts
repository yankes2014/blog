import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './post.model';
import { Comment } from './comment.model';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  idPostEdit: number;

  selectedPost: Post;
  editPost: Post;
  postList: Post[];

  comentarz: Comment = {
    Id: 0, IdAuthor: 0, IdPost: 0, Content: ''
  };

  constructor(private http: Http) { }

  postPost(post: Post) {
    var body = JSON.stringify(post);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:52152/api/Post', body, requestOptions).map(x => x.json());
  }

  putPost(id, post) {
    var body = JSON.stringify(post);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:52152/api/Post/' + id,
      body,
      requestOptions).map(res => res.json());
  }
  getPostList() {
    this.http.get('http://localhost:52152/api/Post')
      .map((data: Response) => {
        return data.json() as Post[];
      }).toPromise().then(x => {
        this.postList = x;
      })
  }

  getPost() {
    this.http.get('http://localhost:52152/api/Post/' + this.idPostEdit)
      .map((data: Response) => {
        return data.json() as Post;
      }).toPromise().then(x => {
        this.editPost = x;
      })
  }

  deletePost(id: number) {
    return this.http.delete('http://localhost:52152/api/Post/' + id).map(res => res.json());
  }

  postComment(comment: Comment) {
    var body = JSON.stringify(comment);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:52152/api/Comment', body, requestOptions).map(x => x.json());
  }
}
