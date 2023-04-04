import { Component, OnInit } from '@angular/core';
import { Meal } from './interfaces/meal.interface';
import { Meals } from './interfaces/meals.interface';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  title = 'recipe-book';

  


}
