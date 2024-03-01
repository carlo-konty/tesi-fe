import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() message: string = "";
  @Input() type: 'success' | 'error' = 'success';
  @Output() close = new EventEmitter<string>();
  
  sendTitle() {
    
  }

  ngOnInit() {
    this.scheduleToastRemoval();
  }

  private scheduleToastRemoval() {
    // Chiudi il toast dopo 5 secondi (5000 millisecondi)
    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast() {
    this.close.emit("false");
  }
}
