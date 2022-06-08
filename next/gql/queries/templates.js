import { gql } from "@apollo/client";
import { TEMPLATE_FRAGMENT } from '../fragments/templates';

// Queries:
export const GET_TEMPLATES = gql`
  query GetTemplates {
    templates {
      ...TemplateFragment
    }
  }
  ${TEMPLATE_FRAGMENT}
`;

// Mutations:
export const CREATE_TEMPLATE = gql`
  mutation CreateTemplate($template: TemplateCreateInput!) {
    createTemplate(template: $template) {
      ...TemplateFragment
    }
  }
  ${TEMPLATE_FRAGMENT}
`;
