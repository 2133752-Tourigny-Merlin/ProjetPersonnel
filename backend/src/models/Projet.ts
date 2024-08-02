import mongoose, { Date, Schema, model } from 'mongoose';

// **** Interface Projet ****//
const types = ["Sculpture", "Dessin", "Peinture"];

export interface IProjet {
    titre: string;
    description?: string; // Make description optional
    date: Date; // Use Date type for date
    id_image: string;
    type: "Sculpture" | "Dessin" | "Peinture";
    _id?: string;
}

// **** ProjetSchema **** //
const ProjetSchema = new Schema<IProjet>({
    titre: { type: String, required: [true, "Le titre du projet est obligatoire"] },
    description: { type: String }, // Optional field
    date: { type: Date, required: [true, "La date du projet est obligatoire"] }, // Use Date type
    id_image: { type: String, required: [true, "L'URL de l'image est obligatoire"] },
    type: { 
        type: String, 
        required: [true, "Le type de projet est obligatoire."],
        enum: {
            values: types,
            message: "Le type de projet doit être l'une des valeurs suivantes: Sculpture, Dessin, Peinture",
        },
    },
});

// **** Exportation **** //
mongoose.pluralize(null);
export default model<IProjet>('projets', ProjetSchema);