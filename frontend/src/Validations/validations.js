import * as yup from 'yup'


export const signupSchema = yup.object().shape({
    name: yup.string().required("Enter your name").min(4, "Name should be minimum 4 letters"),
   
    email: yup
      .string()
      .lowercase()
      .email("Must be a valid email!")
      .required("Email is Required!"),
     
    password: yup
      .string()
      .required("Enter a password!")
      .min(8, "Password should be Minimum 8 characters !")
      
      .matches(/(?=.*[a-z])/, "A lowercase is required!")
      .matches(/(?=.*[A-Z])/, "A uppercase is required!")
      .matches(/(?=.*[0-9])/, "A number is required!"),


    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match!")
    .required("Confirm your password!"),
    
  });