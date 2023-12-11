import Joi from "joi";

export const loginSchema = Joi.object({
  phone: Joi.string().required().messages({
    "string.empty": `رقم الهاتف - لا يجب ان يكون فارغ`,
    "any.required": `رقم الهاتف مطلوب`,
  }),
  password: Joi.string().messages({
    "string.empty": `كلمه المرور - لا يجب ان تكون فارغه`,
    "any.required": `كلمه المرور مطلوبة`,
  }),
});

export const registerSupplierSchema = Joi.object({
  arName: Joi.string().required().messages({
    "string.empty": `الاسم بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الاسم بالعربية مطلوب`,
  }),
  arDescription: Joi.string().required().messages({
    "string.empty": `الوصف بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الوصف بالعربية مطلوب`,
  }),
  commercialRegistrationNo: Joi.string().required().messages({
    "string.empty": `رقم التسجيل التجاري - لا يجب أن يكون فارغاً`,
    "any.required": `رقم التسجيل التجاري مطلوب`,
  }),
  email: Joi.string()
    .pattern(/\S+@\S+\.\S+/)
    .required()
    .messages({
      "string.empty": `البريد الإلكتروني - لا يجب أن يكون فارغاً`,
      "string.email": `يجب أن يكون البريد الإلكتروني صالحاً`,
      "any.required": `البريد الإلكتروني مطلوب`,
    }),
  phone: Joi.string().required().messages({
    "string.empty": `رقم الهاتف - لا يجب ان يكون فارغ`,
    "any.required": `رقم الهاتف مطلوب`,
  }),

  governorate: Joi.string().required().messages({
    "string.empty": `المحافظه - لا يجب أن يكون فارغا`,
    "any.required": `المحافظه مطلوبة`,
  }),
  address: Joi.string().required().messages({
    "string.empty": `العنوان - لا يجب أن يكون فارغا`,
    "any.required": `العنوان مطلوبة`,
  }),
  state: Joi.string().required().messages({
    "string.empty": `الولاية - لا يجب أن يكون فارغا`,
    "any.required": `الولاية مطلوبة`,
  }),
  region: Joi.string().required().messages({
    "string.empty": `المنطقة - لا يجب أن تكون فارغة`,
    "any.required": `المنطقة مطلوبة`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `كلمه المرور - لا يجب ان تكون فارغه`,
    "any.required": `كلمه المرور مطلوبة`,
  }),
  imageURL: Joi.any().required().messages({
    "any.required": `رابط الصورة مطلوب`,
  }),
});

export const registerDefaultUserSchema = Joi.object({
  arName: Joi.string().required().messages({
    "string.empty": `الاسم بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الاسم بالعربية مطلوب`,
  }),
  arDescription: Joi.string().required().messages({
    "string.empty": `الوصف بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الوصف بالعربية مطلوب`,
  }),

  clientType: Joi.string().required().messages({
    "string.empty": `اسم المطعم - لا يجب أن يكون فارغاً`,
    "any.required": `اسم المطعم مطلوب`,
  }),
  email: Joi.string()
    .pattern(/\S+@\S+\.\S+/)
    .required()
    .messages({
      "string.empty": `البريد الإلكتروني - لا يجب أن يكون فارغاً`,
      "string.email": `يجب أن يكون البريد الإلكتروني صالحاً`,
      "any.required": `البريد الإلكتروني مطلوب`,
    }),
  phone: Joi.string().required().messages({
    "string.empty": `رقم الهاتف - لا يجب ان يكون فارغ`,
    "any.required": `رقم الهاتف مطلوب`,
  }),
  governorate: Joi.string().required().messages({
    "string.empty": `المحافظه - لا يجب أن يكون فارغا`,
    "any.required": `المحافظه مطلوبة`,
  }),
  address: Joi.string().required().messages({
    "string.empty": `العنوان - لا يجب أن يكون فارغا`,
    "any.required": `العنوان مطلوبة`,
  }),
  state: Joi.string().required().messages({
    "string.empty": `الولاية - لا يجب أن يكون فارغا`,
    "any.required": `الولاية مطلوبة`,
  }),
  region: Joi.string().required().messages({
    "string.empty": `المنطقة - لا يجب أن تكون فارغة`,
    "any.required": `المنطقة مطلوبة`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `كلمه المرور - لا يجب ان تكون فارغه`,
    "any.required": `كلمه المرور مطلوبة`,
  }),
  imageURL: Joi.any().required().messages({
    "any.required": `رابط الصورة مطلوب`,
  }),
});

export const registerSellerSchema = Joi.object({
  arName: Joi.string().required().messages({
    "string.empty": `الاسم بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الاسم بالعربية مطلوب`,
  }),
  arDescription: Joi.string().required().messages({
    "string.empty": `الوصف بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الوصف بالعربية مطلوب`,
  }),
  commercialRegistrationNo: Joi.string().required().messages({
    "string.empty": `رقم التسجيل التجاري - لا يجب أن يكون فارغاً`,
    "any.required": `رقم التسجيل التجاري مطلوب`,
  }),
  email: Joi.string()
    .pattern(/\S+@\S+\.\S+/)
    .required()
    .messages({
      "string.empty": `البريد الإلكتروني - لا يجب أن يكون فارغاً`,
      "string.email": `يجب أن يكون البريد الإلكتروني صالحاً`,
      "any.required": `البريد الإلكتروني مطلوب`,
    }),
  phone: Joi.string().required().messages({
    "string.empty": `رقم الهاتف - لا يجب ان يكون فارغ`,
    "any.required": `رقم الهاتف مطلوب`,
  }),
  governorate: Joi.string().required().messages({
    "string.empty": `المحافظه - لا يجب أن يكون فارغا`,
    "any.required": `المحافظه مطلوبة`,
  }),
  address: Joi.string().required().messages({
    "string.empty": `العنوان - لا يجب أن يكون فارغا`,
    "any.required": `العنوان مطلوبة`,
  }),
  state: Joi.string().required().messages({
    "string.empty": `الولاية - لا يجب أن يكون فارغا`,
    "any.required": `الولاية مطلوبة`,
  }),
  region: Joi.string().required().messages({
    "string.empty": `المنطقة - لا يجب أن تكون فارغة`,
    "any.required": `المنطقة مطلوبة`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `كلمه المرور - لا يجب ان تكون فارغه`,
    "any.required": `كلمه المرور مطلوبة`,
  }),
  imageURL: Joi.any().required().messages({
    "any.required": `رابط الصورة مطلوب`,
  }),
});

export const updateUserInfoSchema = Joi.object({
  arName: Joi.string().required().messages({
    "string.empty": `الاسم بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الاسم بالعربية مطلوب`,
  }),
  email: Joi.string()
    .pattern(/\S+@\S+\.\S+/)
    .required()
    .messages({
      "string.empty": `البريد الإلكتروني - لا يجب أن يكون فارغاً`,
      "string.email": `يجب أن يكون البريد الإلكتروني صالحاً`,
      "any.required": `البريد الإلكتروني مطلوب`,
    }),
  arDescription: Joi.string().required().messages({
    "string.empty": `الوصف بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الوصف بالعربية مطلوب`,
  }),
  password: Joi.string().messages({
    "string.empty": `كلمه المرور - لا يجب ان تكون فارغه`,
    "any.required": `كلمه المرور مطلوبة`,
  }),
});

export const contactUsSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `الاسم بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الاسم بالعربية مطلوب`,
  }),
  email: Joi.string()
    .pattern(/\S+@\S+\.\S+/)
    .required()
    .messages({
      "string.empty": `البريد الإلكتروني - لا يجب أن يكون فارغاً`,
      "string.email": `يجب أن يكون البريد الإلكتروني صالحاً`,
      "any.required": `البريد الإلكتروني مطلوب`,
    }),
  message: Joi.string().required().messages({
    "string.empty": `رسالتك بالعربيه - لا يجب أن يكون فارغاً`,
    "any.required": `رسالتك بالعربيه مطلوب`,
  }),
});

export const reportUsSchema = Joi.object({
  user: Joi.string().required().messages({
    "string.empty": `الاسم بالعربية - لا يجب أن يكون فارغاً`,
    "any.required": `الاسم بالعربية مطلوب`,
  }),
  message: Joi.string().required().messages({
    "string.empty": `رسالتك بالعربيه - لا يجب أن يكون فارغاً`,
    "any.required": `رسالتك بالعربيه مطلوب`,
  }),
});
