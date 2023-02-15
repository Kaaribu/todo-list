import {Component} from "@angular/core";
import {combineLatest, map, Observable} from "rxjs";
import {TodoInterface} from "../todos/types/todo.interface";
import {FilterEnum} from "../todos/types/filter.enum";
import {TodosService} from "../todos/services/todos.service";

@Component({
selector: 'app-main',
templateUrl: './main.component.html',
})

export class MainComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>
  editId: string | null = null;

  constructor(private todosService: TodosService) {
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(map((todos) =>
    todos.every((todo) => todo.isCompleted)));
    this.noTodoClass$ = this.todosService.todos$.pipe(map((todos) =>
    todos.length === 0));
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$,
    ).pipe(map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
      if (filter === FilterEnum.active) {
        return todos.filter((todo) => !todo.isCompleted);
      } else if (filter === FilterEnum.completed) {
        return todos.filter((todo) => todo.isCompleted);
      }
      return todos;
    }));
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditId(editId: string | null): void {
    this.editId = editId;
  }
}
