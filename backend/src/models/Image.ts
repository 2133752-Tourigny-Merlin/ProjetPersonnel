import mongoose, { Schema, model } from 'mongoose';

// Supported types
const supportedTypes = ["image/png", "image/jpeg", "image/jpg"] as const;

// Interface for Image
export interface IImage {
  _id?: string,
  nom: string;
  taille: number;
  chemin: string;
  dateCreation?: Date;
  type: typeof supportedTypes[number]; // Use the union type of supportedTypes
}

// Image Schema
const ImageSchema = new Schema<IImage>({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    minlength: [3, 'Le nom doit comporter au moins 3 caractères'],
    maxlength: [255, 'Le nom ne doit pas dépasser 255 caractères'],
    match: [/^.+\.(?=[^.]+$)/, 'Le nom est invalide.'],
  },
  taille: {
    type: Number,
    required: [true, 'La taille est obligatoire'],
    min: [0, 'La taille doit être supérieure ou égale à 0'],
  },
  chemin: {
    type: String,
    required: [true, 'Le chemin est obligatoire'],
    minlength: [2, 'Le chemin doit comporter au moins 2 caractères'],
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: supportedTypes,
      message: "Le type n'est pas supporté",
    },
  },
});

// Export the model
mongoose.pluralize(null);
export default model<IImage>('images', ImageSchema);
