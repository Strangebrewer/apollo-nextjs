import { AuthenticationError } from "apollo-server-express";
import { Category, ICategory, ITemplate, Template } from "../../../db/models";
import { Ctx, TemplatePayload } from "../../../types";
import { AUTH_ERROR_MESSAGE, NotFoundError } from "../../../utils/errors";

export type TemplateUpdateReturn = {
  template: ITemplate | null;
  category?: ICategory;
}

const templateMutations = {
  createTemplate: async (_: unknown, { template }: TemplatePayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    template.user = user._id;
    let newTemplate = new Template(template);
    newTemplate = await newTemplate.save();

    if (template.category) {
      const updated = await Category.findByIdAndUpdate(template.category, { template: newTemplate._id }, { new: true });
      if (updated) newTemplate.category = updated;
    }

    return newTemplate;
  },
  
  updateTemplate: async (_: unknown, { id, template }: TemplatePayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    const found = await Template.findById(id);
    if (!found) throw new NotFoundError('template not found');

    let removingCategory = false;
    const update = { ...template };

    // You trigger removing the category from the transactionTemplate
    //   by sending an empty string (or null) from the front end:
    if (template.category === '' || template.category === null) {
      // if there's no category on the transactionTemplate, there's no point in removing it:
      if (found.category) {
        removingCategory = true;
        await Template.updateOne({ _id: id }, { $unset: { category: true } });
      }
      // remove category from the update so it won't throw a "can't cast to ObjectId" error:
      delete update.category;
    }

    const updatedTemplate = await Template.findByIdAndUpdate(id, update, { new: true });
    const toReturn: TemplateUpdateReturn = { template: updatedTemplate };

    // if removing the category from the transactionTemplate,
    //  also remove the transactionTemplate from the category
    if (removingCategory) {
      const category = await Category.findByIdAndUpdate(found.category, { $unset: { template: true } });
      if (category) toReturn.category = category;
      // if a category was sent from the front end,
      //  add the transactionTemplate id to the category:
    } else if (template.category) {
      const category = await Category.findByIdAndUpdate(template.category, { template: id });
      if (category) toReturn.category = category;
    }

    return toReturn;
  },

  deleteTemplate: async (_: unknown, { id }: TemplatePayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    const template = await Template.findOne({ _id: id });
    if (!template) throw new NotFoundError(`template ${id}`);
    
    const toReturn: TemplateUpdateReturn = { template };

    if (template.category) {
      const category = await Category.findByIdAndUpdate(template.category, { $unset: { template: true } });
      if (category) toReturn.category = category;
    }
    
    await Template.deleteOne({ _id: id });
    return toReturn;
  }
};

export default templateMutations;
