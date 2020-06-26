exports.signupValidator = (req, res, next) => {

    /* ##### FORENAME ##### */
    // not empty
    req.check("forename", "Forename required.").notEmpty();

    /* ##### SURNAME ##### */
    // not empty
    req.check("surname", "Surname required.").notEmpty();

    /* ##### EMAIL ##### */
    // email contains .(dot) and @ with min length 4 and max length 150
    req.check('email', 'Email must be between 4 to 150 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Invalid email.')
        .isLength({
            min: 4,
            max: 150
        });
   
    /* ##### PASSWORD ##### */
    // not empty
    req.check("password", "Password required.").notEmpty();
    // length check
    req.check("password")
    .isLength({min: 5})
    .withMessage("Password must contain at least 5 characters.")
    .matches(/\d/)
    .withMessage("Password must contain at least 1 number.");

    /* ##### CHECK FOR ERRORS ##### */
    const errors = req.validationErrors();
    // if erros exist display to user
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
}

exports.createPostValidator = (req, res, next) => {

    /* ##### TITLE ##### */
    // not empty
    req.check("title", "Title required.").notEmpty();
    // length check
    req.check("title", "Title must be between 4 and 150 characters.").isLength({min: 4, max: 150});

    /* ##### BODY ##### */
    // not empty
    req.check("body", "Body required.").notEmpty();
    // length check
    req.check("body", "Body must be between 4 and 2000 characters.").isLength({min: 4, max: 2000});

    /* ##### CHECK FOR ERRORS ##### */
    const errors = req.validationErrors();
    // if erros exist display to user
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
};
