import { Component, signal } from '@angular/core';

@Component({
  selector: 'kc-home',
  host: {
    style: 'flex: 1; display: flex; flex-direction: column',
  },
  template: `
    <h1>CHT</h1>
    <section style="display: flex; flex-direction: column; flex: 1">
      <div style="flex: 1">
        @for(message of messages(); track $index) {
        <p>{{ message }}</p>
        }
      </div>

      <div style="display: flex">
        <input
          #input
          type="text"
          style="flex: 1"
          (keyup.Enter)="[button.click(), input.select()]"
        />
        <button #button (click)="socket.send('ping')">SEND</button>
      </div>
    </section>
  `,
})
export class HomeComponent {
  protected socket = new WebSocket('ws://localhost:8000');
  protected readonly messages = signal<string[]>([]);

  ngOnInit() {
    this.socket.addEventListener('open', () => {
      console.log('a client connected!');
    });

    this.socket.addEventListener('close', () => {
      console.log('a client disconnected!');
    });

    this.socket.addEventListener('message', ({ data }) => {
      this.messages.update((messages) => [...messages, data]);
    });
  }
}
