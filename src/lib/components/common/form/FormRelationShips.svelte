<script lang="ts">
  import { createDocJson, type Data } from "../../../../services/store";
  import translate from "../../../utils/translate";
  import Table from "../table/Table.svelte";
  import FormAttributes from "./FormAttributes.svelte";

  export let relationships: any;

  // Données Incluses (Rappel => included : [ { type, id, attributes } ])
  export let included: Data<any>[];

  let stores = new Array();

  /**
   * Permet de récupérer les données d'une relation
   * @param relation
   */
  const relationAttributes = (relation) =>
    included.filter(
      (value) =>
        value.type === relation["data"].type && value.id === relation["data"].id
    )[0]?.attributes;

  /**
   * Permet de récupérer le stores d'une relation
   * @param relation
   */
  const relationStores = (relation) =>
    stores.filter((value) => value.key === relation["data"].type)[0];

  $: if (included && relationships) {
    // Stores pour l'édition de la relation
    // * relation => { links, data : { id, type} }
    Object.entries(relationships).forEach(([key, relation]) => {
      const links = relation["links"];
      if (links?.related) {
        stores.push({
          key,
          ...createDocJson(key, links.related, relationAttributes(relation)),
        });
      }
    });
  }

  /**
   * Permet de récupérer une configuration pour l'affichage du tableau d'une relation type collection
   * @param type
   * @param relation
   */
  const relationConfig = (type, relation) => {
    return {
      title: "list of " + type,
      type: type,
      // permet le chargement du tableau
      action: relation["links"].related,
    };
  };
</script>

{#each Object.entries(relationships) as [key, relation]}
  {#if Array.isArray(relation["data"])}
    {#if relation["data"].length > 0}
      <Table {...relationConfig(relationAttributes(relation)?.type, relation)} isrelation={true} />
    {:else}
    {translate("noData")}
    {/if}
  {:else}
    <nord-card>
      <span slot="header">{key}</span>
      <FormAttributes type={key} attributes={relationAttributes(relation)} />
      <div style="margin-top: 1rem;">
        <nord-button type="boutton"
          on:keypress|preventDefault={relationStores(relation).edit}
          on:click={relationStores(relation).edit}>
          <span>{translate("save")}</span>
        </nord-button>
      </div>
    </nord-card>
  {/if}
{/each}
