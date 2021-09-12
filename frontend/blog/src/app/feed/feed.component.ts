import { Component, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  listPost : Post[] = [];
  post : Post = new Post;

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.findPosts();
  }

  findPosts(){
    this.postService.getPost().subscribe({
      next : data => this.listPost = data,
      error : err => console.log("Erro", err)
    })
  }

  cadastrarMensagem() {
    this.postService.postMensagem(this.post).subscribe((data : Post) =>{
      this.post = data;
      this.findPosts();
    } )
  }

}
