import * as Yup from 'yup'

export const  signinValidation=Yup.object({   
    email:Yup.string().email('Please enter valid email').required('Please enter email'),           
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,"Please enter strict password").min(4).required('Please enter passsword'),
})