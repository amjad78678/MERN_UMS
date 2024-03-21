  import { apiSlice } from "./apiSlice";

  const ADMIN_URL='/api/admin'

  const adminApiSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({

        adminLogin:builder.mutation({

            query:(data)=>{
            

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
            
               
             return ({
                url: `${ADMIN_URL}/delete-user`,
                method: 'DELETE',
                body:data,
                
             })
            }
           }),
           blockUser:builder.mutation({
 
            query:(data)=>{
            
               
             return ({
                url: `${ADMIN_URL}/block-user`,
                method: 'PATCH',
                body:data,
                
             })
            }
           }),
           
           getUserDetails:builder.mutation({
 
            query:(data)=>{
             return ({
                url: `${ADMIN_URL}/get-update-user/${data}`,
                method: 'GET', 
             })
            }
           }),
           
          updateUser:builder.mutation({
 
            query:(data)=>{
            
               
               
             return ({
                url: `${ADMIN_URL}/update-user`,
                method: 'PUT',
                body:data,
                
             })
            }
           }),

    })

  })

  export const {useAdminLoginMutation,useAdminLogoutMutation,useGetUsersMutation,useAddUserMutation,useDeleteUserMutation,useBlockUserMutation,useUpdateUserMutation,useGetUserDetailsMutation}=adminApiSlice