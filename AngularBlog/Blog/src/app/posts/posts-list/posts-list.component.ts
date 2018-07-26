import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.model';
import { Comment } from '../shared/comment.model'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
@Injectable()
export class PostsListComponent implements OnInit {
  idpostanaliscie: number = 1;
  editable: boolean = false;


  constructor(private router: Router, private postService: PostService) { }


  ngOnInit() {
    this.postService.getPostList();
  }

  showForEdit(emp: Post) {
    this.postService.selectedPost = Object.assign({}, emp);;
  }

  takeIdForEdit(id: number) {
    this.postService.idPostEdit = id;

    this.postService.getPost();
  }


  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.postService.deletePost(id)
        .subscribe(x => {
          this.postService.getPostList();
        })
    }
  }

  onSubmit(form: NgForm, postID: number) {
    //console.log(postID);
    this.postService.comentarz.IdPost = postID;
    this.postService.postComment(this.postService.comentarz).subscribe(data => {
      this.postService.getPostList();
    })
    this.postService.comentarz.Content = "";
  }

}