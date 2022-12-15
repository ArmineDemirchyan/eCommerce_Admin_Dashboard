import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../dummyData";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/apiCalls";

const UserList = () => {
  const [data, setData] = useState(userRows);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  console.log(users)
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
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
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => navigate("/user/" + params.row.id)}
              className="userListEdit"
            >
              Edit
            </button>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default UserList;
