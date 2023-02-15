import {Component} from "@angular/core";
import {TodosService} from "../todos/services/todos.service";
import {map, Observable} from "rxjs";
import {FilterEnum} from "../todos/types/filter.enum";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})

export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  constructor(private todoService: TodosService) {
    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.noTodosClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.filter$ = this.todoService.filter$;
  }


  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todoService.filter$.next(filterName);

  }
}
