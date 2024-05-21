import { check } from "express-validator";

export const loginValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be between 8 and 15 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  check("hospital")
    .trim()
    .notEmpty()
    .withMessage("Hospital is required")
    .isLength({ min: 3 })
    .withMessage("Hospital name must be at least 3 characters long"),
];


export const patientRegisterValidations = [
    check('name')
      .trim()
      .notEmpty().withMessage('Name is required'),
    
    check('address')
      .trim()
      .notEmpty().withMessage('Address is required')
      .isLength({ min: 10 }).withMessage('Address must be at least 10 characters long'),
  
    check('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is not valid'),
  
      check('countryCode')
      .trim()
      .notEmpty().withMessage('Country code is required')
      .isLength({ min: 1, max: 4 }).withMessage('Country code must be between 1 and 4 characters long'),
  
    check('phoneNumber')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 characters long')
      .isNumeric().withMessage('Phone number must contain only numeric characters'),
  
    check('password')
      .trim()
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8, max: 15 }).withMessage('Password must be between 8 and 15 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
    check('file')
      .custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Patient photo is required');
        }
        return true;
      }),
  ];