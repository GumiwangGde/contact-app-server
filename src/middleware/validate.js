const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    const { fieldErrors } = error.flatten();

    return res.status(400).json({
      status: 'fail',
      message: 'Terdapat data yang tidak valid',
      errors: fieldErrors, 
    });
  }
};

export default validate;