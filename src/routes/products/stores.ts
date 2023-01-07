import { writable, type Writable } from "svelte/store";
import type { SyngleJsonAPI } from "../../services/store";

export const defaultValues = {
  reference: "REF_UNDEFINED",
  quantity: 1,
  taxeRule: 5.5,
  amount:10,
};

export const product: Writable<SyngleJsonAPI<any>> = writable({
  data: {
    type: "product",
    id: undefined,
    attributes: {...defaultValues},
    relationships: undefined,
  },
});
