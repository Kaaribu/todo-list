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

  constructor(private todosService: TodosService) {
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
}
