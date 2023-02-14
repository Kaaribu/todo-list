import {Injectable} from "@angular/core";

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);



}
