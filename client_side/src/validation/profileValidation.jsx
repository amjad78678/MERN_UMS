import * as Yup from 'yup'

export const  profileValidation=Yup.object({   
    name:Yup.string().min(4),
    email:Yup.string().email('Please enter valid email'),    
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,"Please enter strict password").min(4),
    cPassword:Yup.string().oneOf([Yup.ref('password')],'Passwords do not match')
})