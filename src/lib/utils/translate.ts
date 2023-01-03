/**
 * Tyepe of Langs
 */
type Langs = {
  fr: string;
  en: string;
};

/**
 * Type of I18n
 */
type I18n = {
  key?: string;
  values: Langs;
};

type Lang = "fr" | "en";

const data: Array<I18n> = [
  { key: "document", values: { fr: "document", en: "document" } },
  { key: "name", values: { fr: "nom", en: "name" } },
  { key: "position", values: { fr: "position", en: "position" } },
  { key: "reference", values: { fr: "référence", en: "reference" } },
  { key: "summary", values: { fr: "résumé", en: "summary" } },
  { key: "languageCode", values: { fr: "langue", en: "language" } },
  {
    key: "created",
    values: { fr: "création", en: "created" },
  },
  {
    key: "updated",
    values: { fr: "modification", en: "updated" },
  },
  
  // Spécifique categories
  { key: "category", values: { fr: "catégorie", en: "category" } },
  { key: "categories", values: { fr: "catégories", en: "categories" } },
  { key: "imageUrl", values: { fr: "image (url)", en: "image (url)" } },
  { key: "thumbnailUrl", values: { fr: "image (thumbnail url)", en: "image (thumbnail url)" } },
  { key: "menuThumbnailUrl", values: { fr: "image (menu thumbnail url)", en: "image (menu thumbnail url)" } },

  // Spécifique produits
  { key: "product", values: { fr: "produit", en: "product" } },
  { key: "products", values: { fr: "produits", en: "products" } },
  {
    key: "priceImpact",
    values: { fr: "prix (impact)", en: "price Impact" },
  },
  { key: "priceTo", values: { fr: "valeur", en: "price To" } },

  {
    key: "defaultVariation",
    values: { fr: "défaut", en: "default" },
  },
  {
    key: "displayed",
    values: { fr: "visible", en: "displayed" },
  },

  // Spécifique produit - stock
  { key: "quantity", values: { fr: "quantité", en: "quantity" } },

  // Spécifique produit - prix
  { key: "amount", values: { fr: "montant", en: "amount" } },
  { key: "price", values: { fr: "prix", en: "price" } },
  { key: "priceHT", values: { fr: "prix (HT)", en: "price HT" } },
  { key: "priceTTC", values: { fr: "prix (TTC)", en: "price TTC" } },
  { key: "priceUnit", values: { fr: "prix (unité)", en: "price Unit" } },
  { key: "priceUnitText", values: { fr: "prix (unité) - texte", en: "price Unit Text" } },

  // Spécifique produit - shipping
  { key: "packageUnit", values: { fr: "package (unité)", en: "packageUnit" } },
  { key: "packageWidth", values: { fr: "package (largeur)", en: "packageWidth" } },
  { key: "packageHeight", values: { fr: "package (hauteur)", en: "packageHeight" } },
  { key: "packageDepth", values: { fr: "package Depth", en: "packageDepth" } },
  { key: "packageWeightUnit", values: { fr: "package Weight Unit", en: "packageWeightUnit" } },
  { key: "packageWeightValue", values: { fr: "package Weight Value", en: "packageWeightValue" } },
  { key: "deliveryTimeQuantityOK", values: { fr: "delivery Time Quantity OK", en: "delivery Time Quantity OK" } },
  { key: "deliveryTimeQuantityNOK", values: { fr: "delivery Time QuantityOK", en: "delivery Time Quantity NOK" } },

  { key: "taxeRule", values: { fr: "taxe", en: "taxe Rule" } },
  { key: "sale", values: { fr: "solde", en: "sale" } },
  { key: "costPrice", values: { fr: "prix en solde", en: "cost Price" } },
  { key: "specificPrices", values: { fr: "prix spécifique", en: "specific Prices" } },

  { key: "description", values: { fr: "Description", en: "description" } },

];

/**
 * Traduction français ou anglais en fonction d'une clé i18n
 * @param {*} key clé i18n
 * @param {*} lang langue cible
 * @returns message traduit dans la langue cible pour la clé i18n correspondante
 */
export default (
  key = "empty",
  lang: Lang = "fr",
  upperCaseOneLetter: boolean = true
): string => {
  let format = undefined;
  let message: string = "#" + key;

  data.forEach((item) => {
    if (item.key === key) {
      message = lang === "fr" ? item.values.fr : item.values.en;
      return;
    }
  });

  return upperCaseOneLetter && !message.includes("#")
    ? message[0].toUpperCase() + message.substring(1)
    : message;
};
