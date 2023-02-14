import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  text: string = '';
  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
      this.text = target.value;
  }

  addTodo() {
    console.log(this.text);
  }
}

