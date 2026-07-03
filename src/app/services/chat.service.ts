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
  private readonly chatUrl = '/api/ai/bot/chat';

  constructor(private http: HttpClient) {}

  sendMessage(prompt: string): Observable<{ ok: boolean; response: string }> {
    return this.http.post<{ ok: boolean; response: string }>(this.chatUrl, { prompt }, { withCredentials: true });
  }

  chat(prompt: string): Observable<GenAIResponse> {
    return this.http.post<GenAIResponse>(this.chatUrl, { prompt }, { withCredentials: true });
  }
}
