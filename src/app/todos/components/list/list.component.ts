import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {TodoInterface} from "../todos/types/todo.interface";
import {TodosService} from "../todos/services/todos.service";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})

export class ListComponent implements OnInit, OnChanges {
  @Input('todo') todoProps: TodoInterface = {} as TodoInterface;
  @Input('isEditing') isEditingProps: boolean = true;
  @Output('setEditId') setEditEvent: EventEmitter<string | null> = new EventEmitter<string | null>();
  editText: string = ''

  @ViewChild('textInput') textInput: ElementRef | undefined;


  constructor(private todosService: TodosService) {
  }

  ngOnInit(): void {
    this.editText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  activateEdit(): void{
    this.setEditEvent.emit(this.todoProps.id);
  }

  deactivateEdit(): void{
    this.setEditEvent.emit(null);
  }

  removeTodo(): void{
    this.todosService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void{
    this.todosService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void{
    const target = event.target as HTMLInputElement;
    this.editText = target.value;
  }

  changeTodo(event: Event): void{
    const target = event.target as HTMLInputElement;
    this.todosService.changeTodo(this.todoProps.id, target.value);
    this.deactivateEdit();
  }
}
