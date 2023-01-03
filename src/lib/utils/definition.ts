import { fieldDef, type InputFielDef } from "./rederer";

export default (from, attributes) => {
  const source:Array<InputFielDef> = fieldDef.filter((value) =>  value.from === from || value.from === "*");

  const target = new Array<InputFielDef>();
  Object.entries(attributes).forEach(([key]) => {
    const sourceDef:Array<InputFielDef> = source.filter((item) => item.key === key);
    if (key !== "links" && sourceDef.length > 0)
    {
      target.push(sourceDef[0]);
    }
    else 
    {
      let value: InputFielDef = {
        key,
        require: false,
        type: "text",
        size: "100%",
        converter: undefined,
      };

      target.push(value);
    }
      
  });

  return target;
};
