import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './posts/shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PostService } from './posts/shared/post.service';

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostsListComponent,
    PostsComponent,
    EditPostComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
      },
      {
        path: 'register', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
      },
      {
        path: 'postList', component: PostsComponent,
        children: [{ path: '', component: PostsListComponent }]
      },
      {
        path: 'newPost', component: PostsComponent,
        children: [{ path: '', component: NewPostComponent }]
      },
      {
        path: 'editPost', component: PostsComponent,
        children: [{ path: '', component: EditPostComponent }]
      },

      { path: '', redirectTo: '/login', pathMatch: 'full' }

    ])
  ],
  providers: [UserService, AuthGuard,
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }