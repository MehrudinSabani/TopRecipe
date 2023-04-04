import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/interfaces/meal.interface';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {


  recipes: Meal[];
  keywordInput: string = '';

  constructor(private recipeService: RecipeService)
  {}

  ngOnInit(): void {
    this.onGetMealsByKeyword()
  }

  onGetMealsByKeyword() {
    this.recipeService.getMealsByKeyword(this.keywordInput).subscribe(
      (results: Meal[]) => {
        // Filter results to only include items that start with the keyword
        this.recipes = results.filter(meal => meal.strMeal.toLowerCase().startsWith(this.keywordInput.toLowerCase()));
        console.log(this.recipes);
      }
    );
  }
  // onKeywordInput(event: any){
  //   this.keywordInput = event.target.value;
  //   this.onGetMeals();
  // }

  // both work
  onKeywordInput(event: Event) {
    this.keywordInput = (event.target as HTMLInputElement).value;
    this.onGetMealsByKeyword();
    }


}

