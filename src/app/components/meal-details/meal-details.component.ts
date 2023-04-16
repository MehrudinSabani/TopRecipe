import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore, collection, where, getDocs } from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';



import {  query,  } from 'firebase/firestore';

import { Meal } from 'src/app/interfaces/meal.interface';
import { Personaliztion } from 'src/app/interfaces/personalization.interface';
import { RecipeService } from 'src/app/services/recipe.service';
import { DataManagementService } from 'src/app/services/data-management.service';
import { AthenticationService } from 'src/app/authentication/athentication.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {


  images = [
    'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg'
  ];
  translateValue = 0;


  mealId: number = 53065;
  // deetails of the recipe
  mealDetails: Meal[];
  // attached user reviews to that recipe
  userData: Personaliztion[] = [];

  recipeId: number;

  // a fake array just so we can receive indexing of 20 elements
  nrOfIngredients = new Array(20);

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private dataManagementService: DataManagementService,
    private authService: AthenticationService,

    ) { }

  ngOnInit(): void {
    this.onGetMealsById()
    this.onGetUserOpinionById();

    setInterval(() => {
      this.translateValue += 33.33;
      if (this.translateValue === 99.99) {
        this.translateValue = 0;
      }
    }, 2000);
  }

  onGetMealsById() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.recipeId = +(params.get('mealid'))
      this.recipeService.getMealsById(this.recipeId).subscribe(
        (results: Meal[]) => {
          this.mealDetails = results;
          console.log('here', results);
        }
      );
    })
  }

  onGetUserOpinionById(){
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.dataManagementService.getUserOpinionById(+(params.get('mealid'))).then((data) => {
        this.userData = data;
        console.log('userData', this.userData);
      })
    })
  }

  onAddUserOpinion(userInput: any){
    this.dataManagementService.addUserOpinion(userInput, this.recipeId);
  }

  // export this to meal/home as well
  async addToFavorites(): Promise<void> {
    const userId = await this.authService.getCurrentUserId();
    const mealId = this.mealDetails[0].idMeal;
    const mealImage = this.mealDetails[0].strMealThumb;
    const mealReference = this.mealDetails[0].strSource;
    const mealName = this.mealDetails[0].strMeal;
  
    this.dataManagementService.addToFavorites(userId, +mealId, mealImage, mealReference, mealName).subscribe(
      response => {
        console.log('Added to favorites', response);
      },
      error => {
        console.error('Error adding to favorites', error);
      }
    );
  }




}
