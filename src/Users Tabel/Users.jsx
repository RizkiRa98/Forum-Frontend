import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/NavbarUser";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ModalPost from "../Sidebar/Component/ModalPost";
import DeleteUser from "./Modal/DeleteUser";
import UpdateUser from "./Modal/UpdateUser";

// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { GetUserLogin } from "../Features/AuthSlice";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

dayjs().format();

export default function Users() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [alertDeleteUser, setAlertDeleteUser] = useState(false);
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const [alertUpdateUser, setAlertUpdateUser] = useState(false);

  // Decode jwt token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setRole(decoded.roleId);
        setUserId(decoded.userId);
        // console.log(decoded.roleId);
        setIsLogin(true);
        // setLogin(true);
      });
    } catch (error) {
      navigate("/PageNotFound");
    }
  };

  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // Method untuk fetch data
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/table?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      setUser(response.data.response);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      // console.log(response.data);
    } catch (error) {}
  };
  // Call Method pada useEffect untuk mendapatkan getForum
  useEffect(() => {
    getUser();
  }, [page, keyword]);

  // Method Change Page
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  // Fungsi Search data user
  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  // // Fungsi set id User untuk delete
  const [idDeleteUser, setIdDeleteUser] = useState("");
  const delForumModal = (id) => {
    setDeleteUserModal(true);
    setIdDeleteUser(id);
  };

  // Handle alert jika berhasil delete Forum
  const aDeleteForum = () => {
    setAlertDeleteUser(true);
  };

  // // Fungsi set id forum untuk update
  const [idUpdateUser, setIdUpdateUser] = useState("");
  const upForumModal = (uuid) => {
    setUpdateUserModal(true);
    setIdUpdateUser(uuid);
  };

  // Handle alert jika berhasil Update Forum
  const aUpdateUser = () => {
    setAlertUpdateUser(true);
  };

  // Use Effect untuk auto close alert Update Forum
  useEffect(() => {
    const alertMsgTimer = setTimeout(() => {
      setAlertUpdateUser(false);
    }, 3000);
    return () => clearTimeout(alertMsgTimer);
  }, [alertUpdateUser]);

  // Use Effect untuk auto close alert Delete Forum
  useEffect(() => {
    const alertMsgTimer = setTimeout(() => {
      setAlertDeleteUser(false);
    }, 5000);
    return () => clearTimeout(alertMsgTimer);
  }, [alertDeleteUser]);

  return (
    <>
      {role !== "" ? (
        <>
          {/* Modal Delete User */}
          {deleteUserModal && (
            <DeleteUser
              setDeleteUserModal={setDeleteUserModal}
              idDeleteUser={idDeleteUser}
              getUser={getUser}
              aDeleteForum={aDeleteForum}
            />
          )}

          {/* Modal Update User */}
          {updateUserModal && (
            <UpdateUser
              setUpdateUserModal={setUpdateUserModal}
              idUpdateUser={idUpdateUser}
              getUser={getUser}
              aUpdateUser={aUpdateUser}
            />
          )}
          {role === "admin" ? (
            <>
              {showModal && <ModalPost setShowModal={setShowModal} />}
              <Navbar />
              <Sidebar setShowModal={setShowModal} />
              <div
                className="flex justify-center mt-20 sm:ml-14 mx-2 
"
              >
                <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-end sm:w-6/12 w-full">
                  <div className="ml-2 text-md font-medium ">Users</div>
                  <div className="grid grid-cols-1 gap-4 justify-end h-[500px] mt-2 xl:w-[980px] w-[700px]">
                    <div className="flex justify-center shadow-sm">
                      <div className="bg-white border rounded-md h-auto shadow-lg w-full ">
                        <label className="flex justify-center items-center text-2xl text-dark font-medium p-3">
                          {" "}
                          Tabel Users
                        </label>
                        {/* Alert delete forum */}
                        {alertDeleteUser && (
                          <div className="flex justify-evenly ">
                            <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                              <strong className=" text-center font-bold text-sm">
                                User Berhasil Dihapus
                              </strong>{" "}
                            </div>
                          </div>
                        )}
                        {/* Alert delete forum */}
                        {alertUpdateUser && (
                          <div className="flex justify-evenly ">
                            <div className=" bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                              <strong className=" text-center font-bold text-sm">
                                Role User Berhasil Di Update
                              </strong>{" "}
                            </div>
                          </div>
                        )}
                        <form
                          onSubmit={searchData}
                          className=" flex items-center mb-3 ml-2"
                        >
                          <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only"
                          >
                            Search
                          </label>
                          <div className="relative">
                            <input
                              type="search"
                              id="default-search"
                              className="block w-[320px] p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-50"
                              placeholder="Search Name, Username, Email, & Role"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              autoComplete="off"
                            />
                          </div>
                          <button
                            type="submit"
                            className="p-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                          >
                            Search
                          </button>
                        </form>

                        <div className="flex overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-500  ">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-200 ">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center"
                                >
                                  No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Role
                                </th>

                                <th scope="col" className="px-3 py-3 text-left">
                                  Created At
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center"
                                  colSpan={2}
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            {user.map((user, index) => (
                              <tbody key={user.id}>
                                <tr className="bg-white border-b border-gray-700">
                                  <th
                                    scope="row"
                                    className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap text-center"
                                  >
                                    {page * limit + index + 1}
                                  </th>
                                  <td className="px-3 py-2 w-auto">
                                    {user.userName}
                                  </td>
                                  <td className="px-3 py-2 w-auto">
                                    {user.name}
                                  </td>
                                  <td className="px-2 py-1 w-auto">
                                    {user.email}
                                  </td>
                                  <td className="px-2 py-1 w-auto text-left">
                                    {user.roleId}
                                  </td>
                                  <td className="px-2 py-1">
                                    {dayjs(user.createdAt).format("DD/MM/YYYY")}
                                  </td>

                                  <td className="flex px-2 mt-1 sm:items-center">
                                    <button
                                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-normal py-1 px-2 rounded-md"
                                      onClick={() => upForumModal(user.uuid)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-2 rounded-md ml-5"
                                      onClick={() => delForumModal(user.id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label className="text-sm text-gray-700 sm:mt-14 lg:mt-14 md:mt-14 mt-16 xl:mt-2">
                    Total Forum : {rows}, Page : {rows ? page + 1 : 0} of{" "}
                    {pages}
                  </label>

                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm xl:w-[980px] w-[700px]"
                    aria-label="Pagination"
                    key={rows}
                  >
                    <ReactPaginate
                      previousLabel={"< Prev"}
                      nextLabel={"Next >"}
                      pageCount={pages}
                      onPageChange={changePage}
                      containerClassName="flex flex-1 items-end justify-end mt-2"
                      activeLinkClassName="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                      previousLinkClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      nextLinkClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      pageLinkClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 mx-1"
                    />
                  </nav>
                </div>
              </div>
            </>
          ) : (
            navigate("/PageNotFound")
          )}
        </>
      ) : (
        navigate("/PageNotFound")
      )}
    </>
  );
}
