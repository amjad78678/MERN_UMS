import * as Yup from 'yup'

export const  signupValidation=Yup.object({   
    name:Yup.string().min(4).required('Please enter your name'),
    email:Yup.string().email('Please enter valid email').required('Please enter email'),           
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,"Please enter strict password").min(4).required('Please enter passsword'),
    cPassword:Yup.string().oneOf([Yup.ref('password')],'Passwords do not match').required('Please enter confirm password')
})