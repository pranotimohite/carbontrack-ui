import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ChatService } from '../../services/chat.service';

interface ChatMessage {
  from: 'user' | 'bot' | 'system';
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  form = this.fb.nonNullable.group({
    prompt: ['', Validators.required]
  });

  messages: ChatMessage[] = [
    {
      from: 'system',
      text: 'Welcome to CarbonTrack chat. Ask about emissions, activity tracking, or app features.'
    }
  ];

  isSending = false;

  constructor(private fb: FormBuilder, private chatService: ChatService) {}

  send() {
    if (this.form.invalid) {
      return;
    }

    const prompt = this.form.value.prompt?.trim();
    if (!prompt) {
      return;
    }

    this.messages.push({ from: 'user', text: prompt });
    this.form.reset();
    this.isSending = true;

    this.chatService.sendMessage(prompt).subscribe({
      next: response => {
        this.messages.push({ from: 'bot', text: response });
      },
      error: () => {
        this.messages.push({
          from: 'system',
          text: 'Unable to reach the chat bot. Please try again in a moment.'
        });
      },
      complete: () => {
        this.isSending = false;
      }
    });
  }
}
