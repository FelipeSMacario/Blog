import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../model/Post';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  listPost: Post[] = [];
  _post: Post[] = [];
  filtragem: string;
  post: Post = new Post();
  faTrash = faTrash;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.findPosts();
  }

  findPosts() {
    this.postService.getPost().subscribe({
      next: (data) => {
        this._post = data;
        this.listPost = this._post;
      },
      error: (err) => console.log('Erro', err),
    });
  }

  cadastrarMensagem() {
    this.postService.postMensagem(this.post).subscribe({
      next : (data) => {this.post = data; this.findPosts()},
      error : err => console.log("Erro", err)
    });
  }

  filtrarMensagem(value: string) {
    value = this.filtragem;
    this.listPost = this._post.filter(
      (post: Post) =>
        post.nome
          ?.toLocaleLowerCase()
          .indexOf(this.filtragem?.toLocaleLowerCase()) > -1
    );
  }

  excluir(id: number) {
    this.postService.deleteMensagem(id).subscribe({
      next: () => {
        console.log('Deletado');
        this.findPosts();
      },
      error: (err) => console.log('Erro', err),
    });
    console.log(id);
  }
}
