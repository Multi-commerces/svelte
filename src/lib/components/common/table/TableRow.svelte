<script lang="ts">
  import type { Data } from "../../../../services/store";
  import { renderedHTML } from "../../../utils/rederer";

  export let data: Data<any>;
</script>


<td>
  <div class="n-table-actions">
    <nord-checkbox class="checkbox" size="s" label="Select row" hide-label />
  </div>
</td>
<!-- svelte-ignore a11y-misplaced-scope -->
<td class="identifier">
  {data.id}
</td>

{#each Object.entries(data?.attributes) as [key, v]}
  <td>{@html renderedHTML(key, v)}</td>
{/each}

<style>
  .n-table-actions {
    display: flex;
    justify-content: center;
  }

  :is(td, th) {
    padding: var(--_n-table-td-padding) var(--n-space-s);
  }

  td {
    border-block-end: 1px solid var(--n-color-border);
    white-space: nowrap;
  }
</style>
