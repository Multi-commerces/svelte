<!-- svelte-ignore custom-element-no-tag -->
<script type="ts">
  import Table from "../../lib/components/common/table/Table.svelte";

  const config = {
    title: "Liste des produits",
    type: "product",
    action: "products",
    params: "include=CATEGORIES&include=IMAGES&include=LANGS&include=PRICING&include=SHIPPING&include=STOCKS&include=VARIATIONS&lang=fr&page=1&size=20",
  };
</script>

<Table {...config} />
