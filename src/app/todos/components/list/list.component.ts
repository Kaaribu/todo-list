import {Component, Input} from '@angular/core';
import {TodoInterface} from "../todos/types/todo.interface";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})

export class ListComponent {
  @Input('todo') todoProps: TodoInterface = {} as TodoInterface;
}
