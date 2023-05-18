export interface Recipe{
    id: string,
    name: string,
    image: string,
    ingredients: string[],
    cookTime: string,
    servings: number,
    equipment: string,
    instructions: string,
    date: string
    isFavorite: boolean
}