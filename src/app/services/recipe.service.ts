import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meals } from '../interfaces/meals.interface';
import { map, Observable, tap } from 'rxjs';
import { CustomMeal, Meal } from '../interfaces/meal.interface';
import { FavoriteMeal } from '../interfaces/favoriteMeal.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  constructor(private http: HttpClient) { }

  private recipeByLetterApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  private recipeByIdApi = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';


  //  chatgpt code

  // with custom properties
  
  // getMeal(): Observable<CustomMeal> {
  //   return this.http.get<any>(this.recipeByLetterApi).pipe(
  //     map(response => {
  //       const meals = response['meals'];
  //       console.log(meals);
  //       const meal = meals[0];
  //       console.log(meals);
  //       const { strMealThumb, strMeal, strCategory, strArea, strInstructions, strTags, strYoutube } = meal;
  //       return { strMealThumb, strMeal, strCategory, strArea, strInstructions, strTags, strYoutube };
  //     })
  //   );

  //   } 

  // easy method from api course, does not work well, complicated indexing. ngforof is not working well
  // getMeals():Observable <Meals> {
  //   return this.http.get<Meals>(this.recipeByLetterApi).pipe(
  //     map(response => this.processMeals(response))
  //   )
  // }
  // private processMeals(meal: Meals): Meals{

  //   return{
  //     meals: {...meal.meals}
  //   }
  // }

// REAL CODE STARTS HERE


    // in that case, you need to modify the getMeals() method to extract the Meal objects from the Meals object and return an array of Meal objects. 
  getMealsByKeyword(keyword: string): Observable<Meal[]> {
    return this.http.get<Meals>(this.recipeByLetterApi+keyword).pipe(
      map(response => Object.values(response.meals)) // extract meals array from response
    );
  }
  
  getMealsById(mealId: number): Observable<Meal[]>{
    return this.http.get<Meals>(this.recipeByIdApi+mealId).pipe(
      map(response => Object.values(response.meals))
    );
  }


  // return meals from firebase

}
