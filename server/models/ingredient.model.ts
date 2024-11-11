import { getModelForClass, prop } from "@typegoose/typegoose";

export class Ingredient {
  @prop({ required: true })
  public name!: string;
}

const IngredientModel = getModelForClass(Ingredient);
export default IngredientModel;
