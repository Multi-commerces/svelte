/**
 * Rendu au format HTML en fonction du format cible
 * @param {*} value
 * @param {*} format
 * @returns
 */
export const renderedHTML = (key, value) => {
  return rendererHtmlOrText(key, value, "html");
};

/**
 * Rendu au format HTML de la colonne d'un tabeau en fonction du format cible
 * @param {*} value
 * @param {*} format
 * @returns
 */
export const renderedColumn = (key, value) => {
  return rendererHtmlOrText(key, value, "html");
};

/**
 * Rendu au format Texte simple en fonction du format cible
 * @param {*} value
 * @param {*} format
 * @returns
 */
export const renderedText = (key, value) => {
  return rendererHtmlOrText(key, value, "text");
};

export type InputFielDef = {
  from?: string;
  type: string;
  key: string;
  require?: boolean;
  readonly?: boolean;
  size?: string;
  converter?: any;
  order?: number;
};

export type ConverterProps = {
  value: any;
  renderer?: string;
  key?: string;
};

const padTo2Digits = (v: number) => {
  return String(v).padStart(2, "0");
};

const formatDate = (date: Date) => {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
};

const formatLocalDate = (date: Date) => {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth() ,
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );
};

const dateTimeConverter = (value, renderer = "text" || "html" || undefined) => {
  let target = value;

  // Convertion des dates au format FR
  if (value && Date.parse(value)) {
    const date = formatLocalDate((new Date(value)));
    target =
      renderer === "html"
        ? `<span title="${date}">${(new Date(value)).toLocaleString("fr-FR")}</span>`
        : formatDate(date);
  }
  return target;
};

const defaultConverter = (value: any, renderer = "html") => {
  let target;

  if (typeof value === "boolean") {
    target = booleanConverter(value, renderer);
  } else if (isNaN(value) && !isNaN(Date.parse(value))) {
    target = dateTimeConverter(value, renderer);
  } else {
    target = value;
  }

  return target;
};

const booleanConverter = (value: boolean, renderer = "html") => {
  let target;
  if (renderer === "html") {
    target = `<nord-badge type="${
      value ? "success" : "warning"
    }">${value}</nord-badge>`;
  } else {
    target = String(value);
  }

  return target;
};

const valueConverter = (value) => {
  return value?.value;
};

/**
 * Converter d'une entité
 * @param entity
 * @param renderer
 * @param key
 * @returns
 */
const entiteConverter = (
  entity: any,
  renderer: string = "text" || "html" || undefined,
  key?: String
): String | HTMLElement => {
  if (renderer && renderer === "html") {
    return `<span id="${key ? key + "-" : ""}${entity.id}">${
      entity.nom
    }</span>`;
  }

  return entity?.nom ?? "";
};

/**
 * Converter d'une personne
 * @param person
 * @param renderer
 * @param key
 * @returns
 */
const personConverter = (
  person: any,
  renderer: string = "text" || "html" || undefined,
  key?: String
): String | HTMLElement => {
  const value = (person?.prenomInd ?? "") + " - " + (person?.nomInd ?? "");

  if (renderer && renderer === "html") {
    return `<span id="${key ? key + "-" : ""}${person?.id}">${value}</span>`;
  }

  return value;
};

const vehicleConverter = (
  vehicle: any,
  renderer: string = "text" || "html" || undefined,
  key?: String
): String | HTMLElement => {
  if (renderer && renderer === "html") {
    return `<span id="${key ? key + "-" : ""}${vehicle.id}">${
      vehicle.description
    }</span>`;
  }

  return vehicle?.description ?? "";
};

/**
 * Définition pour la construction des InputFiel
 */
export const fieldDef: Array<InputFielDef> = [
  {
    from: "*",
    key: "created",
    readonly : true,
    type: "datetime-local",
    size: "100%",
    converter: dateTimeConverter,
  },
  {
    from: "*",
    key: "updated",
    type: "datetime-local",
    readonly: true,
    size: "100%",
    converter: dateTimeConverter,
  },

  {
    from: "product",
    key: "priceImpact",
    require: true,
    type: "number",
    size: "100%",
  },
  {
    from: "product",
    key: "reference",
    require: true,
    type: "string",
    size: "100%",
  },

  {
    from: "product",
    key: "name",
    require: false,
    type: "string",
    size: "100%",
  },

  {
    from: "product",
    key: "quantity",
    require: true,
    type: "number",
    size: "100%",
  },
  {
    from: "product",
    key: "defaultVariation",
    require: true,
    type: "boolean",
    size: "100%",
  },
  {
    from: "product",
    key: "displayed",
    require: true,
    type: "boolean",
    size: "100%",
  },
  {
    from: "product",
    key: "summary",
    require: true,
    type: "text",
    size: "100%",
  },
  {
    from: "product",
    key: "amount",
    require: true,
    type: "text",
    size: "100%",
  },
  {
    from: "product",
    key: "description",
    require: true,
    type: "email",
    size: "100%",
  },
  {
    from: "product",
    key: "priceTo",
    require: true,
    type: "text",
    size: "100%",
  },
  {
    from: "product",
    key: "languageCode",
    require: true,
    type: "text",
    size: "100%",
  },
  {
    from: "shipping",
    key: "price",
    require: true,
    type: "number",
    size: "100%",
  },
  {
    from: "shipping",
    key: "packageUnit",
    require: true,
    type: "number",
    size: "100%",
  },
  {
    from: "shipping",
    key: "packageWidth",
    require: true,
    type: "number",
    size: "100%",
  },
  {
    from: "shipping",
    key: "packageHeight",
    require: true,
    type: "number",
    size: "100%",
  },
  {
    from: "shipping",
    key: "packageDepth",
    require: true,
    type: "number",
    size: "100%",
  },

  {
    from: "shipping",
    key: "packageWeightUnit",
    require: true,
    type: "number",
    size: "100%",
  },
  {
    from: "shipping",
    key: "packageWeightValue",
    require: true,
    type: "number",
    size: "100%",
  },
  {
    from: "shipping",
    key: "deliveryTimeQuantityOK",
    require: true,
    type: "number",
    size: "100%",
  },
  {
    from: "shipping",
    key: "deliveryTimeQuantityNOK",
    require: true,
    type: "number",
    size: "100%",
  },

  {
    from: "pricing",
    key: "sale",
    require: true,
    type: "text",
    size: "100%",
  },
  {
    from: "vehicle",
    key: "entite",
    type: "relation",
    converter: entiteConverter,
    size: "100%",
  },
  {
    from: "vehicle",
    key: "vehicle",
    type: "relation",
    converter: vehicleConverter,
    size: "100%",
  },
  {
    from: "vehicle",
    key: "releve",
    type: "relation",
    converter: valueConverter,
    size: "100%",
  },
  {
    from: "vehicle",
    key: "chauffeur",
    type: "relation",
    converter: personConverter,
    size: "100%",
  },
  {
    from: "vehicle",
    key: "releveAjuste",
    type: "relation",
    converter: valueConverter,
    size: "100%",
  },
];

export const productFormDef: Array<InputFielDef> = fieldDef.filter((value) => {
  return value.from === "product" || value.from === "*";
});

/**
 * Récupérérer la définition
 * @param key 
 * @param from
 * @returns
 */
export const getInputFieldDef = (key: string, from?: string): InputFielDef => {
  let value: InputFielDef = {
    key,
    require: false,
    type: "text",
    size: "100%",
    converter: undefined,
  };

  fieldDef.forEach((item: InputFielDef) => {
    if (item.key === key && (!from || from === item.from || from === "*")) {
      Object.assign(value, item);
      return;
    }
  });
  return value;
};

/**
 * Moteur de rendu 'HTML' ou 'Texte brute' en foction du format cible
 * @param {*} value
 * @param {*} renderer
 * @param {*} format
 * @returns
 */
const rendererHtmlOrText = (
  key: string,
  value: any,
  renderer: string = "text" || "html"
) => {
  let target = `<span>${value}</span>`;

  const fieldDef = getInputFieldDef(key);
  if (!fieldDef?.converter) {
    target = defaultConverter(value);
  } else {
    target = fieldDef.converter(value, "html", key);
  }

  // case "Icone":
  //     target = `${
  //       value === "EUR" ? `<nord-badge type="error">€uro</nord-badge>` : target
  //     }`;
  return target ?? "-";
};
export default rendererHtmlOrText;
export const all = { renderedHTML, renderedColumn, renderedText };
