import { ICategory } from "../../../db/models";
import { Ctx } from "../../../types";

const categoryFields = {
  Category: {
    transactionTemplate: async ({ transactionTemplate }: ICategory, _: unknown, { loaders }: Ctx) => {
      let templateId = transactionTemplate;
      if (typeof transactionTemplate === 'object' && transactionTemplate._id) {
        templateId = transactionTemplate._id;
        return loaders.template.one(templateId as any);
      }
      return null;
    }
  }
};

export default categoryFields;
