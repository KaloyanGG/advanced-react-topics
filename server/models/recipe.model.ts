import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Ingredient } from "./ingredient.model";

class Recipe {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public instructions!: string;

  @prop({ required: true })
  public image!: string;

  @prop({ default: 0 })
  public likes!: number;

  @prop({ type: () => [Ingredient], ref: () => Ingredient })
  public ingredients!: Ref<Ingredient>[];
}

const RecipeModel = getModelForClass(Recipe);
export default RecipeModel;
