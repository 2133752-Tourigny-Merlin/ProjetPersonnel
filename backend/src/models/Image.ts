import mongoose, { Schema, model } from 'mongoose';

// **** Interface Image **** //
const supportedTypes = ["png", "jpeg", "jpg"] as const;

export interface IImage {
  nom: string;
  taille: number;
  chemin: string;
  dateCreation?: Date;
  type: "png" | "jpeg" | "jpg";
}

// **** ImageSchema **** //
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


// **** Exportation **** //
mongoose.pluralize(null);
export default model<IImage>('images', ImageSchema);