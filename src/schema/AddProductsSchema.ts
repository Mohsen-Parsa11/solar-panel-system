import * as yup from 'yup';

export type ProductValidationMessages = {
  nameRequired: string;
  skuRequired: string;
  categoryRequired: string;
  invalidCategory: string;
  brandRequired: string;
  descriptionRequired: string;
  invalidImageUrl: string;
};

export const productSchema = (
  messages: ProductValidationMessages,
) =>
  yup.object({
    name: yup
      .string()
      .trim()
      .required(messages.nameRequired),

    sku: yup
      .string()
      .trim()
      .required(messages.skuRequired),

    category: yup
      .string()
      .oneOf(
        ['SOLAR_PANEL', 'BATTERY', 'INVERTER', 'ACCESSORY'],
        messages.invalidCategory,
      )
      .required(messages.categoryRequired),

    brand: yup
      .string()
      .trim()
      .required(messages.brandRequired),

    productType: yup.string().trim().optional(),

    warranty: yup.string().trim().optional(),

    efficiency: yup.string().trim().optional(),

    description: yup
      .string()
      .trim()
      .required(messages.descriptionRequired),

    imageUrl: yup
      .string()
      .trim()
      .url(messages.invalidImageUrl)
      .optional()
      .nullable(),
  });
