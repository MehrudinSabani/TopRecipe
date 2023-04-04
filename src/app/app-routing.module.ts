import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MealDetailsComponent } from './components/meal-details/meal-details.component';
import { MealComponent } from './components/meal/meal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


const routes: Routes =[
  {path: 'meals', component: MealComponent},
  { path: 'home', component: MealComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'favorite', component: FavoritesComponent },

  // question: what does the : mean and what should it match
  {path: 'meal/:mealid', component: MealDetailsComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  {path: '**', redirectTo: 'meals'}

]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
