<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { Link, navigate } from "svelte-routing";
  import { writable, type Writable } from "svelte/store";
  import { fly } from "svelte/transition";
  import {
    documentCollection,
    doDelete,
    type CollectionJsonAPI,
    type Data,
    type SyngleJsonAPI,
  } from "../../../../services/store";
  import definition from "../../../utils/definition";
  import type { InputFielDef } from "../../../utils/rederer";
  import translate from "../../../utils/translate";
  import TableRow from "./TableRow.svelte";
  import "/src/lib/webcomponents/my-table.js";

  /**
   * Element HTML table
   */
  let table = undefined;

  /**
   * Référence les lignes (éléments HTML) du tableau
   */
  let refs = new Array<HTMLElement>();
  $: if (refs) {
    // on supprime la class css car on ne veut pas de style par défaut
    refs.forEach((value) => {
      value.classList.remove("n-row-selected");
    });
  }

  /*
   * Event dispatcher
   */
  const dispatch = createEventDispatcher();

  /*
   * Props de la table
   */
  export let isrelation: boolean = false;
  export let title: string = "";
  export let type: string = "";
  export let host: string = "http://localhost:8081/";
  export let action: string = "";
  export let params: string = "";
  // export let token: string = "";
  // export let links = { self : "/" + action};

  let url;
  $: {
    url = (host ? host + action : action) + (params ? "?" + params : "");
  }

  /**
   * STORES : Document collection Json:API (custom-stores).
   */
  const writableArray: Writable<CollectionJsonAPI<any>> = writable({
    data: [],
  });

  const documentCollectionStores = documentCollection(type, action, params);
  documentCollectionStores.subscribe((value) => {
    writableArray.set(value);
  });

  /*
   * TODO non utilisé pour le moment
   * Déclarations réactives (synchroniser les variables)
   * "réexécuter ce code chaque fois que l'une des valeurs référencées change".
   */
  let selectedRow: Data<any> = undefined;
  $: if (selectedRow) {
    // nous pouvons également exécuter des déclarations arbitraires de manière réactive.
  }

  /**
   * Liste des éléments sélectionnés
   */
  let selectedRows: Array<Data<any>> = new Array();
  $: if (selectedRows) {
    // nous pouvons également exécuter des déclarations arbitraires de manière réactive.
    if (selectedRows.length > 1) {
      selectedRow = undefined;
    } else {
      selectedRow = selectedRows[0];
    }
  }
  
  let blocActions;
  let tHead;
  let tBody;
  let toggleAll;
  let checkboxes;
  let render;
  $: if(tHead && tBody)
  {
    checkboxes = tBody.querySelectorAll("nord-checkbox");
    render = () => {
      let count = 0;
      selectedRows = new Array();
      checkboxes.forEach((checkbox) => {
        
        if (checkbox.checked)
        {
          // Mise à jour des éléments sélectionnés
          $writableArray.data.forEach(element => {
            if(element.id === checkbox.closest("tr").getAttribute("data-id"))
            {
              selectedRows.push(element);
            };
          });
          count++;
        }
        const trElement =  checkbox.closest("tr")
        trElement.classList.remove("n-row-selected");
        trElement.classList.toggle("n-row-selected", checkbox.checked);
        
        blocActions.setAttribute("style", "visibility:" + (count === 0 ? "hidden" : "visible"));
        
      });
      toggleAll.indeterminate = count > 0 && count < checkboxes.length;
      toggleAll.checked = count === checkboxes.length;
    }

    // toggleAll - Event Listener
    toggleAll.addEventListener("change", () => {
      checkboxes.forEach((checkbox) => checkbox.checked = toggleAll.checked);
      render();
    });

    // tBody - Event Listener
    tBody.addEventListener("change", render);
  }

 

  onMount(() => {
    //doGet(url);
    documentCollectionStores.fetch();    
  });

  /**
   * Détection de la ligne sélectionnée et redirection vers la page de moification.
   * TODO : Version draft (il faudra trouver meilleure une logique)
   */
  const selectedId = () => {
    let rows = tBody.querySelectorAll("tr.n-row-selected");

    const ids = new Array();
    rows.forEach((row) => {
      const checkbox = row.querySelector(".checkbox");
      if (checkbox.checked) {
        const identifier = row.querySelector(".identifier");
        ids.push(identifier.innerText);
      }
    });
    return ids;
  };

  const handlerEdit = () => {
    const id = selectedId()[0];

    navigate("/" + type + "?id=" + id, { replace: true });
    dispatch("edit", { id });
  };

  const handlerRemove = () => {
    const ids: Array<any> = selectedId();

    ids.forEach((id) => {
      doDelete(host + action + "/" + id, {
        data: {
          type: type,
          id: id,
          attributes: undefined,
        },
      }).then();
      {
        refs.forEach((v) => {
          if (ids.includes(v.getAttribute("data-id"))) v.remove();
        });
        dispatch("remove", { id });
      }
    });
  };

  const handlerClick = (i: number, data: Data<any>) => {
    const checkbox = refs[i].querySelector("nord-checkbox");
    checkbox.checked = !checkbox.checked;   
    render();
    dispatch("click", { ref: refs[i], data });
  };

  const handlerDblclick = (data: Data<any>) => {
    dispatch("dblclick", { data });

    navigate("/" + type + "?id=" + data.id, { replace: false });
  };

  // DEFINITION DU DOCUMENT
  let defFields = (): InputFielDef[] =>
    definition(
      $writableArray.data[0]?.type,
      $writableArray.data[0]?.attributes
    );

  const size = "s";
</script>

<nord-card padding="none">
  {#if $writableArray.data.length > 0}
    <!-- <my-table id="myTable"  bind:this={table} transition:fly={{ y: 200, duration: 230 }} > -->
    <span slot="header">{title}</span>
    <div slot="header-end" id="actions" style="visibility: hidden" bind:this={blocActions}>
      <span id="message" aria-live="polite" aria-atomic="true">0 items selected</span>
      <slot name="header-actions">
        {#if !isrelation}
          <nord-button variant="primary" {size} on:click={handlerEdit} on:keypress={handlerEdit}>
            {translate("edit")}
          </nord-button>
        {:else}
          <nord-button variant="primary" {size} on:click={handlerEdit} on:keypress={handlerEdit}>
            {translate("add")}
          </nord-button>
        {/if}
        <nord-button variant="danger" {size} on:click={handlerRemove} on:keypress={handlerRemove}>
          {translate("remove")}
        </nord-button>
      </slot>
    </div>
    
   

    <nord-table density="condensed" striped>
      <table bind:this={table}>
        <thead id="thead" bind:this={tHead}>
          <tr>
            <th>
              <div class="n-table-actions">
                <nord-checkbox bind:this={toggleAll} size="s" label="Select row" hide-label />
              </div>
            </th>
            <th><h3>#id</h3></th>
            {#each defFields() as defField}
              <th><h3>{translate(defField.key)}</h3></th>
            {/each}
          </tr>
        </thead>
        <tbody bind:this={tBody}>
          {#each $writableArray.data as data, i}
            <tr slot="tbodycolumn" class="n-row-selected" data-id={data.id} bind:this={refs[i]}
              on:click={() => handlerClick(i, data)} on:dblclick={() => handlerDblclick(data)}>
              <TableRow {data} />
            </tr>
          {/each}
        </tbody>
      </table>
    </nord-table>
    <!-- </my-table> -->

    <Link to={type}>{translate("create-item")}</Link>
  {:else}
    <p>{translate("service not available")} ...</p>
  {/if}

 
    <!-- <h2 slot="header">Document JSON:API</h2>
    <pre>{JSON.stringify(action, null, 2)}</pre> -->
 
</nord-card>

<style>
  .n-row-selected[slot="tbodycolumn"] {
    background-color: #b7bbb1 !important;
  }
  :is(td, th) {
    padding: var(--_n-table-td-padding) var(--n-space-s);
  }
</style>
