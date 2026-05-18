
  // certificate_calification_url: yup
  //   .string()
  //   .required("Certificatul de calificare este obligatoriu"),

  // // ANRE devine CONDITIONAL
  // autorizatie_anre_gaze_image_url: yup.string().when("job", {
  //   is: (val) => val === "instalator_gaze",
  //   then: (schema) => schema.required("Autorizatia ANRE este obligatorie"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // autorizatie_anre_gaze_expiration_date: yup.string().when("job", {
  //   is: (val) =>val === "instalator_gaze",
  //   then: (schema) =>
  //     schema.required("Data expirarii este obligatorie").matches(regex_date),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // autorizatie_anre_electrician_image_url: yup.string().when("job", {
  //   is: (val) => val === "electrician",
  //   then: (schema) => schema.required("Autorizatia ANRE este obligatorie"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // autorizatie_anre_electrician_expiration_date: yup.string().when("job", {
  //   is: (val) => val === "electrician",
  //   then: (schema) =>
  //     schema.required("Data expirarii este obligatorie").matches(regex_date),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // autorizatie_iscir_termic_image_url: yup.string().when("job", {
  //   is: (val) => val === "instalator_termic",
  //   then: (schema) => schema.required("Autorizatie ISCIR obligatorie"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  //  autorizatie_iscir_termic_expiration_date: yup.string().when("job", {
  //   is: (val) => val === "instalator_termic",
  //   then: (schema) => schema.required("Data expirarii este obligatorie").matches(regex_date),
  //   otherwise: (schema) => schema.notRequired(),
  // })

