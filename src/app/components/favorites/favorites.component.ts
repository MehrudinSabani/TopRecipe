import { Component, OnInit } from '@angular/core';
import { AthenticationService } from 'src/app/authentication/athentication.service';
import { DataManagementService } from 'src/app/services/data-management.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteMeals: any[] = [];

  constructor(private dataManagementService: DataManagementService,
    private authService: AthenticationService ) { }

  ngOnInit(): void {
    this.onGetFavoriteMeals();
  }

  async onGetFavoriteMeals() {
    const userId = await this.authService.getCurrentUserId();
    try {
      const favoriteMeals = await this.dataManagementService.getFavorites(userId);
      this.favoriteMeals = favoriteMeals;
      console.log('Favorites:', this.favoriteMeals);
    } catch (error) {
      console.log('Error retrieving favorites:', error);
    }
  }

  // todo
  removeFromFavorites(){
    
  }


}
