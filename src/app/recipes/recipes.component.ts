import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

const convertTimestampToDate = (timestamp: string) => {
  return moment.unix(Number(timestamp)).format("DD/MM");
}


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Recipe> | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit{
  expandSet = new Set<string>();
  recipes:Recipe [] = [];
  recipe:Recipe | undefined;
  currentUserId: string | undefined;
  filteredRecipes: Recipe[]=[];

  constructor(private router:Router, private recipeService:RecipeService) {}


  ngOnInit(): void {
    this.recipeService.getCurrentUserId().subscribe(currentUserId => {
      if (currentUserId) {
        this.currentUserId = currentUserId;
        this.getRecipes();
      } 
    });
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .then((recipes) => {
        this.recipes = recipes;
        this.filteredRecipes=recipes;
      })
      .catch((error) => {
        console.error('Error getting recipes:', error);
      });
    }

  edit(recipeId : any){
    let url: string = "home/edit/" + recipeId;
    this.router.navigateByUrl(url);
  }

  editFavorite(recipeId : any){

    if(this.currentUserId){
      this.recipeService.getRecipeById(this.currentUserId, recipeId)
        .then((recipe: Recipe | null) => {
          if (recipe) {
            this.recipe = recipe;
            if(this.recipe?.isFavorite == true)
                this.recipe.isFavorite = false;
            else
                this.recipe.isFavorite = true;

            this.recipeService.updateRecipe(this.currentUserId!, recipeId, recipe)
          }
        })
        .catch((error) => {
        });
    }

    this.reloadPage();

  }

  delete(recipeId : any){
    this.recipeService.deleteRecipe(recipeId);
    this.reloadPage() ;
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload(); }, 1000);
 }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Recipe, b: Recipe) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Cook time',
      sortOrder: null,
      sortFn: (a: Recipe, b: Recipe) => a.cookTime.localeCompare(b.cookTime),
      sortDirections: ['descend', 'ascend', null],
    },
    {
      name: 'Number of servings',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Recipe, b: Recipe) => a.servings - b.servings,
    },
    {
      name: 'Favourite',
      sortOrder: null,
      sortFn: (a: Recipe, b: Recipe) => Number(a.isFavorite) - Number(b.isFavorite),
      sortDirections: ['descend', 'ascend', null],
    },
    {
      name: 'Last updated',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Recipe, b: Recipe) => a.date.localeCompare(b.date),
    },
    {
      name: 'Actions',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
    },
  ];

  filterRecipes(filter: string) {
    this.filteredRecipes = this.recipeService.filterRecipes(filter, this.recipes)
  }

}
