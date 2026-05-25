import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GenAIResponse {
  ok: boolean;
  response?: string;
  message?: string;
  model?: string | null;
  timestamp?: number;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly chatUrl = '/api/bot/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    return this.http.post(this.chatUrl, { message }, { responseType: 'text', withCredentials: true });
  }

  chat(prompt: string): Observable<GenAIResponse> {
    return this.http.post<GenAIResponse>(this.chatUrl, { prompt }, { withCredentials: true });
  }
}
