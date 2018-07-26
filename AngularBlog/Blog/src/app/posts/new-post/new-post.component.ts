import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../shared/post.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
@Injectable()
export class NewPostComponent implements OnInit {

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.postService.selectedPost = {
      Id: 0,
      Content: '',
      Title: '',
      CreationDate: '',
      IdAuthor: 0,
      Comments: null,
      showComments: false
    }
  }

  onSubmit(form: NgForm) {
      this.postService.postPost(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.postService.getPostList();
        })
        
    this.router.navigate(['/postList']);

  }

}
