import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AthenticationService } from '../authentication/athentication.service';
import { FavoriteMeal } from '../interfaces/favoriteMeal.interface';
import { Personaliztion } from '../interfaces/personalization.interface';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  
  // userData: Personaliztion = {
  //   referenceId: 53060,
  //   comment: 'this som bussin fat ass spanking fajitas',
  //   rating: 4,
  //   favorite: true
    
  // }

  // now after we sent data to firebase we can use an empty variable
  // todo: solve the issue of any type
  // userData: Personaliztion;
  userData: Personaliztion;
  userFavorite: FavoriteMeal;

  constructor(
    private firestore: Firestore,
    private recipeService: RecipeService,
    private authService: AthenticationService
  ) { }

    // send to firebase
  addUserOpinion(userData: any, referenceId: number){
    const collectionInstance = collection(this.firestore, 'userOpinions');
    // userData.value, .value is used when its only an 
    const data = {...userData.value, referenceId}; // using spread operator to add mealId to userData.value
    addDoc(collectionInstance, data)
      .then(() => {
        console.log('Data saved successfully')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async getUserOpinionById(id: number) {
    const collectionInstance = collection(this.firestore, 'userOpinions');
    const q = query(collectionInstance, where('referenceId', '==', id));
    const querySnapshot = await getDocs(q);
    const userData = []; // Reset userData to empty array
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const opinion = {
        // id: doc.id,
        comment: docData['comment'],
        rating: docData['rating'],
        referenceId: docData['referenceId'],
        favorite: docData['favorite']
        // timestamp: docData['timestamp'].toDate().toISOString() // Convert Firestore Timestamp to JS Date and then to ISO string
      };
      userData.push(opinion);
      console.log('opinion', opinion);
    });
    return userData;
  }


  addToFavorites(userId: string, mealId: number, mealImage: string, mealReference: string, mealName: string): Observable<any> {

    const collectionInstance = collection(this.firestore, 'userFavorites');

    const favoriteMeal: FavoriteMeal = {
      userId,
      mealId,
      mealImage,
      mealReference,
      mealName,
      favorite: true
    };
    return from(addDoc(collectionInstance, favoriteMeal));
}


async getFavorites(uuid: string) {
  const collectionInstance = collection(this.firestore, 'userFavorites');
  const q = query(collectionInstance, where('userId', '==', uuid));
  const querySnapshot = await getDocs(q);
  const userFavorite = []; // Reset userFavorite to empty array
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const opinion = {
      // userId: docData[uuid],

      // todo: try it with ... operator or something similar
      mealId: docData['mealId'],
      mealImage: docData['mealImage'],
      mealName: docData['mealName'],
      mealReference: docData['mealReference'],
      favorite: docData['favorite'],
    };
    userFavorite.push(opinion);
    console.log('opinion', opinion);
  });
  return userFavorite;
}




    // Old backups
  // // send to firebase
  // // for now its commented, we modify this later when implementing user input
// this sends the hardcoded userData array to the firebase backend

  // // addUserOpinion(userData: Personaliztion){
  // //   const collectionInstance = collection(this.firestore, 'userOpinions');
  // //   addDoc(collectionInstance, userData)
  // //     .then(() => {
  // //       console.log('Data saved successfully')
  // //     })
  // //     .catch((err) => {
  // //       console.log(err)
  // //     })
  // // }
  
  // async getUserOpinionById(id: number) {
  //   const collectionInstance = collection(this.firestore, 'userOpinions');
  
  //   const q = query(collectionInstance, where('referenceId', '==', id));
  
  //   const querySnapshot = await getDocs(q);
    
  //   querySnapshot.forEach((doc) => {
  //     const docData = doc.data();
  //     const opinion = {
  //       id: doc.id,
  //       comment: docData['comment'],
  //       rating: docData['rating'],
  //       referenceId: docData['referenceId'],
  //       favorite: docData['favorite']
  //       // timestamp: docData['timestamp'].toDate().toISOString() // Convert Firestore Timestamp to JS Date and then to ISO string
  //     };
  //     this.userData.push(opinion);
  //     console.log('opinion', opinion)
  //   });

  //   return this.userData;
  // }
  
}
