import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../dummyData";
import { DeleteOutline } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [data,setData]= useState(userRows);
  const navigate = useNavigate();
  const handleDelete = (id) =>{
    setData(data.filter(item=>item.id!==id))
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "user", headerName: "User", width: 200, renderCell: (params)=>{
      return (
          <div className="userListUser">
              <img className="userListImg" src={params.row.avatar} alt=""/>
              {params.row.username}
          </div>
      )
   } },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params)=>{
          return(
              <>
              <button onClick={()=>navigate("/user/"+params.row.id)} className="userListEdit">
              Edit
              </button>
              <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
              </>
          )
      }
    }
  ]
  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default UserList;
