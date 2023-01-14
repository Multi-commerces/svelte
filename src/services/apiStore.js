import { writable } from 'svelte/store';


/* 
 * Ce code crée un store générique qui utilise Axios pour effectuer des requêtes HTTP. 
 * Il a des méthodes pour récupérer des données, créer des données, mettre à jour des données et supprimer des données. 
 * Il utilise également la méthode subscribe de Svelte pour permettre aux composants de s'abonner aux mises à jour du store.
 */

// Creates a store to handle JSON API requests
function createJsonApiStore(baseUrl) {
  const store = writable({});

  // Fetches data from the specified path of the API with query parameters
  async function fetchData(path, params) {
    try {
      let url = `${baseUrl}/${path}`;
      if (params) {
        url += '?' + new URLSearchParams(params).toString();
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      if(json.data) {
        store.set(json.data);
      } else {
        store.set({ error: json.errors });
      }
    } catch (error) {
      store.set({ error });
    }
  }

  // Sends a POST request to the specified path of the API with the provided data
  async function createData(path, data) {
    await sendRequest('POST', path, data);
  }

  // Sends a PUT request to the specified path of the API with the provided data
  async function updateData(path, data) {
    await sendRequest('PUT', path, data);
  }

  // Sends a DELETE request to the specified path of the API
  async function deleteData(path) {
    await sendRequest('DELETE', path);
  }

  // Sends a request to the specified path of the API with the provided method, data and headers
  async function sendRequest(method, path, data) {
    try {
      const options = { method };
      if (data) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
      }
      const response = await fetch(`${baseUrl}/${path}`, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      if (json.data) {
        switch (method) {
          case 'POST':
            store.update(data => [...data, json.data]);
            break;
          case 'PUT':
            store.update(data => data.map(item => item.id === json.data.id ? json.data : item));
            break;
          case 'DELETE':
            store.update(data => data.filter(item => item.id !== json.data.id));
            break;
        }
      } else {
        store.set({ error: json.errors });
      }
    } catch (error) {
      store.set({ error });
    }
  }

  return {
    subscribe: store.subscribe,
    fetch: fetchData,
    create: createData,
    update: updateData,
    delete: deleteData
  };
}

const myApiStore = createJsonApiStore('https://my-json-api.com');