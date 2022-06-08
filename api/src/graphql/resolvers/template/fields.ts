import { ITemplate } from "../../../db/models";
import { Ctx } from "../../../types";

const templateFields = {
  Template: {
    category: async (template: ITemplate, _: unknown, { loaders }: Ctx) => {
      if (template.category)
        return loaders.category.one(template.category as any);
      return null;
    },
    destination: async (template: ITemplate, _: unknown, { loaders }: Ctx) => {
      if (template.destination)
        return loaders.account.one(template.destination as any);
      return null;
    },
    source: async (template: ITemplate, _: unknown, { loaders }: Ctx) => {
      if (template.source)
        return loaders.account.one(template.source as any);
      return null;
    },
  }
};

export default templateFields;
