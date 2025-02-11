import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const personne = defineCollection({
  loader: glob({ base: "src/data/personne", pattern: "**/*.md" }),
  schema: z.object({
    nom: z.string(),
    lieuNaissance: z.string(),
    dateNaissance: z.date(),
    dateDeces: z.date().optional(),
    nationalite: z.string(),
    profession: z
      .array(
        z.enum([
          "acteur",
          "realisateur",
          "scenariste",
          "producteur",
          "compositeur",
          "monteur",
          "directeur-photo",
          "costumier",
          "maquilleur",
          "effets-speciaux",
          "effets-visuels",
        ])
      )
      .optional(),
  }),
});

const films = defineCollection({
  loader: glob({ base: "src/data/films", pattern: "**/*.md" }),
  schema: z.object({
    titre: z.string(),
    dateSortie: z.date(),
    realisateur: reference("personne").optional(),
    scenariste: z.array(reference("personne")).optional(),
    roles: z.array(
      z.object({ acteur: reference("personne"), role: z.string() })
    ),
  }),
});
export const collections = { personne, films };
