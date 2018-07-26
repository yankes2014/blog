import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.postService.getPost();
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
    this.postService.putPost(this.postService.idPostEdit, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.postService.getPostList();
      })
    this.router.navigate(['/postList']);
  }

}
