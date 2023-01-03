import { writable, type Writable } from "svelte/store";
import { documentJson, documentSyngleWritable, type SyngleJsonAPI } from "../../services/store";

type Attributes = {
  position:number;
  imageUrl: string;
  thumbnailUrl: string;
  menuThumbnailUrl: string;
};

export const defaultValues: Attributes = {
  position:undefined,
  imageUrl: undefined,
  thumbnailUrl: undefined,
  menuThumbnailUrl: undefined,
};







