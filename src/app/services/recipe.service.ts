import { Injectable } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore'
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { AuthenticationService } from '../services/authentication.service';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

const convertTimestampToDate = (timestamp: string) => {
  return moment.unix(Number(timestamp)).format("DD/MM");
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  currentUserId: string | null = null;
  currentDate = new Date();
  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor(public authService: AuthenticationService) {
    this.firestore = new FirebaseTSFirestore;
    this.auth = new FirebaseTSAuth;
  }


  getCurrentUserId(): Observable<string> {
    return this.authService.currentUser$.pipe(
      map(user => user ? user.uid : '')
    );
  }

  getRecipeById(currentUserId: string, recipeId: string): Promise<Recipe | null> {
    return new Promise<Recipe | null>((resolve, reject) => {
      this.firestore.getDocument({
        path: [currentUserId, recipeId],
        onComplete: (doc) => {
          if (doc.exists) {
            const recipe = doc.data() as Recipe;
            recipe.id = doc.id;
            recipe.date = convertTimestampToDate(recipe.date);
            resolve(recipe);
          } else {
            resolve(null); // Recipe not found
          }
        },
        onFail: (err) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }



  getRecipes(): Promise<Recipe[]> {
    return new Promise<Recipe[]>((resolve, reject) => {
      this.getCurrentUserId().subscribe(currentUserId => {
        this.firestore.getCollection({
          path: [currentUserId ?? ''],
          where: [],
          onComplete: (result) => {
            const recipes: Recipe[] = result.docs.map((doc) => {
              const recipe = doc.data() as Recipe;
              recipe.id = doc.id;
              recipe.date = convertTimestampToDate(recipe.date);
              return recipe;
            });
            resolve(recipes);
          },
          onFail: (err) => {
            reject(err);
          }
        });
      });
    });
  }

  addRecipe(recipe: Recipe): void {
    this.getCurrentUserId().subscribe(currentUserId => {
      if (currentUserId) {
        this.firestore.create({
          path: [currentUserId],
          data: {
            name: recipe.name,
            image: recipe.image,
            ingredients: recipe.ingredients,
            cookTime: recipe.cookTime,
            servings: recipe.servings,
            equipment: recipe.equipment,
            instructions: recipe.instructions,
            date: new Date(),
            isFavorite: false
          },
          onComplete: (docId) => {
            alert("Recipe Created");
            recipe.name = "";
            recipe.image = "";
            recipe.ingredients = [];
            recipe.cookTime = "";
            recipe.servings = 0;
            recipe.equipment = "";
            recipe.instructions = "";
          },
          onFail: (err) => {
            console.error(err);
          }
        });
      } else {
        console.error("Current user ID is empty.");
      }
    });
  }


  deleteRecipe(recipeId: any): void {
    this.getCurrentUserId().subscribe(currentUserId => {
      if (!currentUserId || !recipeId) {
        console.error('Collection path/ Recipe ID is not defined.');
        return;
      }
      this.firestore
        .delete({ path: [currentUserId, recipeId] })
        .then(() => {
          console.log('Document deleted successfully.');
        })
        .catch((error: any) => {
          console.error('Error deleting document:', error);
        });
    });

  }

  filterRecipes(filter :string, recipes : Recipe[]){
    if (filter == undefined) {
      return recipes;
    }

    let recipesArray = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(filter.toLowerCase())
    })

    return recipesArray
  }

  updateRecipe(currentUserId: string, recipeId: string, updatedRecipe: Recipe): Promise<void> {
    const convertedRecipe = {
      name: updatedRecipe.name,
      image: updatedRecipe.image,
      ingredients: updatedRecipe.ingredients,
      cookTime: updatedRecipe.cookTime,
      servings: updatedRecipe.servings,
      equipment: updatedRecipe.equipment,
      instructions: updatedRecipe.instructions,
      date: new Date(),
      isFavorite: updatedRecipe.isFavorite
    };

    return this.firestore
      .update({ path: [currentUserId, recipeId], data: convertedRecipe })
      .then(() => {
        console.log('Recipe updated successfully.');
      });
  }
}