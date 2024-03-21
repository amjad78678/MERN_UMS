import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../UserSide/Loader";
import { useBlockUserMutation, useDeleteUserMutation, useGetUserDetailsMutation, useGetUsersMutation } from "../../redux/adminApiSlice";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [forceUpdate, setForceUpdate] = useState(1);

  

  function filterData(searchText, userList) {
    if (searchText == "") {
      return users;
    } else {
      const filtered = userList.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );

      return filtered;
    }
  }

  const [getUsers, { isLoading }] = useGetUsersMutation();
  const [deleteUser]=useDeleteUserMutation();
  const [blockUser]=useBlockUserMutation();



  async function fetchUsers() {
    const res = await getUsers().unwrap();
    
    setUsers(res);
  }

  useEffect(() => {
    fetchUsers();
  }, [forceUpdate]);

  useEffect(() => {
    const filteredUsers = filterData(search, users);
    setFilteredUsers(filteredUsers);

}, [search,users,forceUpdate]);

const handleBlockUnblockUser=async(userId)=>{

      try {
        await blockUser({userId:userId})
        setForceUpdate(prevForceUpdate => prevForceUpdate+1); 
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
}
const [getUserDetails]=useGetUserDetailsMutation()
const handleUpdateButton=async(userId)=>{


    try {
      await getUserDetails({userId:userId})
    } catch (error) {
      toast.error(error.message || error.error)
    }
}

const handleDeleteClick=async(userId)=>{

  
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this data!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
  }).then(async(result) => {
    if (result.isConfirmed) {
      
      try {
      const msg=await deleteUser({userId:userId})
      if(msg){
        setForceUpdate(prevForceUpdate => prevForceUpdate+1); 
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');

      }

      } catch (error) {
        toast.error(error.data.message || error.error)
      }
      

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Your data is safe :)', 'info');
    }
  });


}

  return (
    <div
   
      className="bg-cover bg-no-repeat min-h-screen"
    >
      <Container>
        <Form.Group
          className=" d-flex align-items-center"
          controlId="searchForm"
        >
          <Form.Label className="me-2 ">Search:</Form.Label>
          <Form.Control
            style={{ width: "30vw" }}
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>


        {/* {isLoading && <Loader />} */}
        <div className="table-responsive rounded-lg">
          <Link to="/admin/add-user">
            <button className="py-2 px-3 bg-black text-white rounded-lg ml-auto float-end  hover:shadow-2xl hover:scale-105">
              ADD USER
            </button>
          </Link>
          <Table
            bordered
            hover
            className="mt-5 text-center align-middle rounded-lg"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            {filteredUsers && (
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index} >
                    <td>{index + 1}</td>
                    <td className="">
                      <div className="profile-image">
                        <img
                          src={user.imageUrl}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                          alt={user.name}
                        />
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isBlocked ? (
                        <Button
                          onClick={() => handleBlockUnblockUser(user._id)}
                          className="btn-success w-25 ms-2"
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleBlockUnblockUser(user._id)}
                          className="btn-danger w-25 ms-2"
                        >
                          Block
                        </Button>
                      )}

                      <Link to={`/admin/get-update-user/${user._id}`}>
                        <Button onClick={()=>handleUpdateButton(user._id)} className="btn-success mx-2">Update</Button>
                      </Link>

                      <Button
                        className="btn-danger"
                        title="Delete"
                          onClick={() => handleDeleteClick(user._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
