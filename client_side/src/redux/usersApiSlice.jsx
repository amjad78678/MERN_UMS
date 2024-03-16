import { apiSlice } from "./apiSlice";

const USERS_URL= '/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => {
                console.log('Request Data:', data); // Log the request data
                return ({
                    url: `${USERS_URL}/auth`,
                    method: 'POST',
                    body: data
                });
            }
        }),
        logout:builder.mutation({
            query:(data)=>{
                return ({
                    url: `${USERS_URL}/logout`,
                    method: 'POST',
                
                })
            }
        }),
        register:builder.mutation({
           query:(data)=>{
            return ({
                url:`${USERS_URL}`,
                method: 'POST',
                body: data
            })
           }
        }),
        profileUpdate:builder.mutation({
            query:(data)=>{
                console.log('iam updapi data',data)
             return ({
                 url:`${USERS_URL}/profile`,
                 method: 'PUT',
                 body: data,
                 headers: {
                    'Content-Type': 'multipart/form-data',
                  },
             })
            }
         })  
    })
   
});


export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileUpdateMutation}=usersApiSlice;