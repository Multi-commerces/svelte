<script>
  import { createJsonApiStore } from "./json-api-store.js";
  const myApiStore = createJsonApiStore("https://my-json-api.com");

  let name;
  let age;
  let id;

  let data = [];

  // En utilisant la fonction subscribe de Svelte, un objet unsubscribe est retourné.
  // Cette fonction peut être utilisée pour annuler l'abonnement à la mise à jour du store.
  // Il est généralement utilisé pour éviter des fuites de mémoire lorsque le composant qui s'abonne au store n'est plus utilisé.
  // Il est important de ne pas oublier de désabonner d'un store lorsque vous en avez fini avec lui.
  let unsubscribe = myApiStore.subscribe((value) => {
    data = value;

    // En faisant cela, les champs de saisie seront automatiquement vidés après chaque mise à jour de données réussie,
    //indépendamment de la fonction qui a été utilisée pour la mise à jour (createData, updateData ou deleteData).
    id = "";
    name = "";
    age = "";
  });

  // Lorsque le composant est detruit
  onDestroy(() => {
    unsubscribe();
  });

  async function fetchData() {
    myApiStore.fetch("users");
  }

  async function createData() {
    myApiStore.create("users", { name, age });
  }

  async function updateData() {
    myApiStore.update(`users/${id}`, { name, age });
  }

  async function deleteData(id) {
    myApiStore.delete(`users/${id}`);
  }

  //onMount(async () => {
  //  myApiStore.subscribe((value) => {
  //    articles = value.data;
  //    error = value.error;
  //  });

  // Fetch articles
  //  myApiStore.fetch("articles");
  //});
</script>

<button on:click={fetchData}>Fetch Data</button>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each data as user}
      <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td>
          <button on:click={() => (id = user.id)}>Edit</button>
          <button on:click={() => deleteData(user.id)}>Delete</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<div>
  <label for="name">Name:</label>
  <input id="name" type="text" bind:value={name} />
  <label for="age">Age:</label>
  <input id="age" type="text" bind:value={age} />
  <button on:click={createData}>Create</button>
  <button on:click={updateData}>Update</button>
</div>
