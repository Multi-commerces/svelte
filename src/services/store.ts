// store.js
import type { ToastGroup } from "@nordhealth/components";
import { navigate } from "svelte-routing";
import {
  writable,
  type Writable,
} from "svelte/store";

const host = "https://api.web-maker.fr/";

/**
 * serializeSchema : transformation des attributs au format ld+json
 * @param thing
 * @returns
 */
export function serializeSchema(thing) {
  return `<script type="application/ld+json">${JSON.stringify(thing)}</script>`;
}

export type Data<P> = {
  type: string;
  id: string;
  attributes: P;
  relationships?: any;
};
export type CollectionJsonAPI<P> = {
  data: Array<Data<P>>;
};
export type SyngleJsonAPI<P> = {
  included?: Array<Data<P>>;
  data?: Data<P>;
};

/**
 * Reultat (post || patch)
 */
export let result: Writable<string> = writable("");
export let token: Writable<string> = writable("");

let xAuthToken: string = "";
token.subscribe((value) => {
  xAuthToken = value;
});

/**
 * Objet pour le formulaire d'édition et le pull-request
 */
export type DocumentSyngle = Writable<SyngleJsonAPI<any>>;
export const documentSyngleWritable: DocumentSyngle = writable({
  data: {
    type: undefined,
    id: undefined,
    attributes: {},
    relationships: undefined,
  },
});

/**
 * Objet (type collection) pour la lecture des données
 */
export type DocumentCollection = CollectionJsonAPI<any>;

const headers = {
  "accept": "application/vnd.api+json, application/json;charset=utf-8",
  "content-type": "application/vnd.api+json",
  "X-Auth-Token": xAuthToken,
  "Origin": "https://web-maker.fr",
  "Referer": "https://web-maker.fr/",
  "Sec-Fetch-Mode": "no-cors",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Site": "cross-site",
  // "location": host,
  "include-Links": "true",
};

export const doGet = async (action, id?: string, params?: string) => {
  const response = await fetch(
    host + action + "/" + (id ?? "") + (params ? "?" + params : ""),
    {
      method: "GET",
      headers: {
        ...headers,
      },
    }
  ).catch((error) => {
    console.log("Erreur sur l'appel à api distante" + error);
    return Promise.reject({
      status: "ERR_CONNECT",
      statusText: "Le serveur ne répond pas",
      body: "",
    });
  });

  if (response.ok) {
    // Get JSON value from the response body
    return Promise.resolve(await response.json());
  } else {
    return Promise.reject({
      status: response.status,
      statusText: response.statusText,
      body: await response.text(),
    });
  }
};

export const doPost = async (action: string, document: any) => {
  const response = await fetch(host + action, {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: document.data.type,
        id: document.data.id,
        attributes: document.data.attributes,
      },
    }),
  }).catch((error) => {
    return Promise.reject(document);
  });

  if (response.ok) {
    const group: ToastGroup = window.document.querySelector("nord-toast-group");
    group.addToast(JSON.stringify("action.save.ok"), {
      variant: "default",
      autoDismiss: 5000,
    });

    return Promise.resolve(await response.json());
  } else {
    return Promise.reject(await document);
  }

  // const data = await response.json();

  // const isOK = response.status < 300;
  // if (isOK) {
  //   navigate(action, { replace: true });
  // }

  // Object.entries($document?.data?.attributes).forEach(([key, value]) => {
  //   $document.data.attributes[key] = defaultValues[key];
  // });
};

export const doPatch = async (action: string, document: any, id?: string) => {
  const response = await fetch(host + action + "/" + (id ?? ""), {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      data: {
        type: document.data.type,
        id: document.data.id,
        attributes: document.data.attributes,
      },
    }),
  });

  if (response.ok) {
    const group: ToastGroup = window.document.querySelector("nord-toast-group");
    group.addToast(JSON.stringify("action.save.ok"), {
      variant: "default",
      autoDismiss: 5000,
    });

    return Promise.resolve(await response.json());
  } else {
    return Promise.reject(await document);
  }
};

export const doDelete = async (
  action: string,
  document: SyngleJsonAPI<any>
) => {
  const type = document.data.type;
  const id = document.data.id;

  const res = await fetch(action, {
    method: "DELETE",
    headers,
    body: JSON.stringify({
      data: { type, id },
    }),
  });

  const group: ToastGroup = window.document.querySelector("nord-toast-group");
  group.addToast("action.delete.ok", {
    variant: "default",
    autoDismiss: 5000,
  });

  navigate("/" + type + "s", { replace: true });
};

function createDocumentCollection(type: string, action: string, params?: any) {
  const { subscribe, set, update }: Writable<CollectionJsonAPI<any>> = writable(
    {
      data: [],
    }
  );

  return {
    subscribe,
    fetch: () => {
      doGet(action, null, params).then((value) => {
        // Document collection JSON:API
        set(value);
      });
    },
    set: (n: CollectionJsonAPI<any>) => set(n),
    update: () => update((n) => n),
    add: () => {
      update((n) => n);
    },
    remove: () => update((n) => n),
    reset: () =>
      set({
        data: [],
      }),
  };
}
export const documentCollection = (
  type: string,
  action: string,
  params?: any
) => createDocumentCollection(type, action, params);

/**
 * Magasin de données JSON:API document.
 * Permet de faire du CRUD sur un document suivant la spécification JSON:API
 * @param type
 * @param action
 * @param attributes
 * @returns
 */
export function createDocJson(type: string, action: string, queryParams?: any, attributes?: any) {
  const { subscribe, set, update }: Writable<SyngleJsonAPI<any>> = writable({
    data: {
      type: type,
      id: undefined,
      attributes: attributes ?? {},
      relationships: undefined,
    },
  });

  return {
    subscribe,
    search: (id: string) => {
      doGet(action, id, queryParams).then((value) => set(value));
    },
    edit: () =>
      update((n) => {
        doPatch(action, n, n.data.id).then((jsonAPI) => {
          // document (json:api) en reponse de api RestFul
          
        });
        // document enregistré par l'utilisateur.
        return n;
      }),
    create: () => {
      update((n) => {
        doPost(action, n).then((jsonAPI) => {
          // document (json:api) en reponse de api RestFul
          set(jsonAPI);
          navigate("/" + action, { replace: false });
        });
        // document enregistré par l'utilisateur.
        return n;
      });
    },
    delete: () =>
      update((n) => {
        doDelete(action, n);
        navigate("/" + action, { replace: false });
        return this.reset();
      }),
    reset: () =>
      set({
        data: {
          type: type,
          id: undefined,
          attributes: {},
          relationships: undefined,
        },
      }),
  };
}

export const documentJson = (type: string, action: string, queryParams?:string, attributes?: any) =>
  createDocJson(type, action, queryParams, attributes);
