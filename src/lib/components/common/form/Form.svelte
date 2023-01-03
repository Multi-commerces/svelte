<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { doDelete, doPatch, type SyngleJsonAPI } from "../../../../services/store";
  import type { InputFielDef } from "../../../utils/rederer";
  import Table from "../table/Table.svelte";
  import Form from "./Form.svelte";
  import Input from "./InputField.svelte";


  // export let method: string = "POST";
  // export let host: string = "http://127.0.0.1:8081";

  // export let token: string = "";
  // export let enctype: string = "application/vnd.api+json";
  export let action: string = "";
  export let params: string = undefined;
  export let ignore: boolean = false;

  export let document: Writable<SyngleJsonAPI<any>>;

  export let formDef: InputFielDef[] = new Array();

  let result = null;
  $: relationships = new Array();

  onMount(async () => {
    if (!$document.data.id) {
      await fetch(!params ? action : action + "?" + params, {
        method: "GET",
        headers: {
          Location: "http://localhost:8081",
          "include-Links": "true",
        },
      })
        .then((response) => (response ? response?.json() : undefined))
        .then((docJsonApi) => {
          document.set(docJsonApi);

          // définition du formulaire
          Object.entries(docJsonApi?.data?.attributes).forEach(
            ([key]) => {
              const isExists = formDef.filter((item) => {
                return item.key === key;
              });

              if (!isExists || isExists.length <= 0) {
                formDef.push({ key, type: "string" });
              }
            }
          );

          // Récupération des relations
          if (!ignore) {
            relationships = new Array();
            if (docJsonApi?.data?.relationships) {
              Object.entries(docJsonApi?.data?.relationships).forEach(
                ([key, value]) => {
                  const relation: any = value;
                  relationships.push({
                    key,
                    links: relation.links,
                    data: relation.data,
                  });
                }
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
    }
  });
</script>

<form>
  <nord-card class="n-container">
    {#if ignore}
      {#each formDef as def}
        <Input name={def.key} bind:value={$document.data.attributes[def.key]} />
      {:else}
        <p>Chargement du formulaire en-cours...</p>
      {/each}

      <div style="margin-top: 1rem;">
        <nord-button>Annuler</nord-button>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <nord-button type="boutton" on:click={doPatch(action, $document)}>Enregistrer</nord-button>
      </div>
    {:else}
      <nord-tab-group label="données principales">
        <nord-tab slot="tab" aria-controls="tab-data">formulaire</nord-tab>
        <nord-tab-panel id="tab-data" selected>
          <div style="margin: 0.5rem;overflow-x: auto;">
            <h2>Résultat</h2>
            <pre>
            {JSON.stringify(result, null, 2)}
          </pre>
          </div>

          {#each formDef as def}
            <Input
              name={def.key}
              bind:value={$document.data.attributes[def.key]}
            />
          {:else}
            <p>Chargement du formulaire en-cours...</p>
          {/each}

          <h2>Data</h2>
          <pre>{JSON.stringify($document.data.attributes, null, 2)}</pre>
          <div style="margin-top: 1rem;">
            <nord-button>Annuler</nord-button>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <nord-button type="boutton" on:click|preventDefault={doPatch(action, $document, $document.data.id)}
              >Enregistrer</nord-button
            >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <nord-button type="boutton" on:click|preventDefault={doDelete(action, $document)}
              >Supprimer</nord-button
            >
          </div>
        </nord-tab-panel>

        {#each relationships as r}
          <nord-tab slot="tab" aria-controls="tab-relation-{r.key}"
            >{r.key}</nord-tab
          >
          <nord-tab-panel id="tab-relation-{r.key}">
            <div style="margin: 0.5rem;">
              <h2>Result</h2>
              <pre>
              {result}
            </pre>
            </div>

            <div>
              {#if r.links.related && !ignore}
                <div>
                  <!-- svelte-ignore security-anchor-rel-noreferrer -->
                  <a href={r.links.related} target="_blank"
                    >related link {r.key}</a
                  >
                </div>
                {#if Array.isArray(r.data)}
                  <!-- svelte-ignore missing-declaration -->
                  <Table title="Liste des {r.key}" action={r.links.related} />
                {:else}
                  <Form
                    ignore={true}
                    action={r.links.related}
                    formDef={[]}
                    document={writable({
                      data: {
                        type: r.key,
                        id: r.data.id,
                        attributes: {},
                        relationships: undefined,
                      },
                    })}
                  />
                {/if}
              {/if}

              {#if r.links.self}
                <div>
                  <!-- svelte-ignore security-anchor-rel-noreferrer -->
                  <a href={r.links.self} target="_blank">self link {r.key}</a>
                </div>
              {/if}
            </div>
          </nord-tab-panel>
        {/each}
      </nord-tab-group>
    {/if}

    <!-- <h2>Data</h2>
  <pre>{JSON.stringify($document, null, 2)}</pre> -->
  </nord-card>
</form>

<style>
</style>
