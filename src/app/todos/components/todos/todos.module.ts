import {NgModule} from "@angular/core";
import {TodosComponent} from "src/app/todos/components/todos/todos.component";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "src/app/todos/components/header/header.component";
import {TodosService} from "./services/todos.service";
import {MainComponent} from "../main/main.component";
import {CommonModule} from "@angular/common";
import {ListComponent} from "../list/list.component";
import {FooterComponent} from "../footer/footer.component";

const routes = [
  {
    path: '',
    component: TodosComponent
  }
]

@NgModule({
  declarations: [
    TodosComponent,
    HeaderComponent,
    MainComponent,
    ListComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [TodosService],
  bootstrap: []
})

export class TodosModule {}
