  import { apiSlice } from "./apiSlice";

  const ADMIN_URL='/api/admin'

  const adminApiSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({

        login:builder.mutation({

            query:(data)=>{
            console.log('Request Data:', data); // Log the request data

            return ({

             url: `${ADMIN_URL}/`,
             method: 'POST',
             body: data

            })

            }
        }),
        adminLogout:builder.mutation({
 
         query:(data)=>{
   
          return ({
             url: `${ADMIN_URL}/logout`,
             method: 'POST',
             
          })
         }
        }),
        getUsers:builder.mutation({
 
          query:(data)=>{
    
           return ({
              url: `${ADMIN_URL}/users`,
              method: 'GET',
              
           })
          }
         }),
         addUser:builder.mutation({
 
          query:(data)=>{
    
           return ({
              url: `${ADMIN_URL}/add-user`,
              method: 'POST',
              body:data,
              
           })
          }
         }),
         deleteUser:builder.mutation({
 
            query:(data)=>{
            
               console.log('iamdelet',data)
             return ({
                url: `${ADMIN_URL}/delete-user`,
                method: 'DELETE',
                body:data,
                
             })
            }
           }),
           blockUser:builder.mutation({
 
            query:(data)=>{
            
               console.log('iamdelet',data)
             return ({
                url: `${ADMIN_URL}/block-user`,
                method: 'PATCH',
                body:data,
                
             })
            }
           })

    })

  })

  export const {useLoginMutation,useAdminLogoutMutation,useGetUsersMutation,useAddUserMutation,useDeleteUserMutation,useBlockUserMutation}=adminApiSlice