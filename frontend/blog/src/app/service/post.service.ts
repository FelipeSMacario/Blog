import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient : HttpClient) { }

  postUrl : string = "http://localhost:3000/posts";

  getPost() : Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.postUrl}`);
  }

  postMensagem(post : Post) : Observable<Post>{
    return this.httpClient.post<Post>(`${this.postUrl}`, post);
  }
}
