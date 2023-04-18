import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/NavbarUser";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import ModalPost from "../Sidebar/Component/ModalPost";
import CreateForum from "./Modal/CreateForum";
import DeleteForum from "./Modal/DeleteForum";
import UpdateForum from "./Modal/UpdateForum";
import ReactPaginate from "react-paginate";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { GetUserLogin } from "../Features/AuthSlice";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
dayjs().format();

export default function Forum() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [forum, setForum] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [createForumModal, setCreateForumModal] = useState(false);
  const [deleteForumModal, setDeleteForumModal] = useState(false);
  const [updateForumModal, setUpdateForumModal] = useState(false);
  const [alertCreateForum, setAlertCreateForum] = useState(false);
  const [alertUpdateForum, setAlertUpdateForum] = useState(false);
  const [alertDeleteForum, setAlertDeleteForum] = useState(false);

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
    } catch (error) {}
  };

  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // Method untuk fetch data
  const getForum = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/forums/table?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      setForum(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      // console.log(response.data);
    } catch (error) {
      navigate("/PageNotFound");
    }
  };
  // Call Method pada useEffect untuk mendapatkan getForum
  useEffect(() => {
    getForum();
  }, [page, keyword]);

  // Handle alert jika berhasil delete Forum
  const aDeleteForum = () => {
    setAlertDeleteForum(true);
  };

  // Use Effect untuk auto close alert Delete Forum
  useEffect(() => {
    const alertMsgTimer = setTimeout(() => {
      setAlertDeleteForum(false);
    }, 3000);
    return () => clearTimeout(alertMsgTimer);
  }, [alertDeleteForum]);

  // Handle alert jika berhasil create Forum
  const aCreateForum = () => {
    setAlertCreateForum(true);
  };

  // Use Effect untuk auto close alert Create Forum
  useEffect(() => {
    const alertMsgTimer = setTimeout(() => {
      setAlertCreateForum(false);
    }, 3000);
    return () => clearTimeout(alertMsgTimer);
  }, [alertCreateForum]);

  // Handle alert jika berhasil Update Forum
  const aUpdateForum = () => {
    setAlertUpdateForum(true);
  };

  // Use Effect untuk auto close alert Update Forum
  useEffect(() => {
    const alertMsgTimer = setTimeout(() => {
      setAlertUpdateForum(false);
    }, 3000);
    return () => clearTimeout(alertMsgTimer);
  }, [alertUpdateForum]);

  // // Fungsi set id forum untuk delete
  const [idDeleteForum, setIdDeleteForum] = useState("");
  const delForumModal = (id) => {
    setDeleteForumModal(true);
    setIdDeleteForum(id);
  };

  // // Fungsi set id forum untuk update
  const [idUpdateForum, setIdUpdateForum] = useState("");
  const upForumModal = (id) => {
    setUpdateForumModal(true);
    setIdUpdateForum(id);
  };

  // Method Change Page
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <>
      {role !== "" ? (
        <>
          {/* Modal Create Forum */}
          {createForumModal && (
            <CreateForum
              setCreateForumModal={setCreateForumModal}
              getForum={getForum}
              aCreateForum={aCreateForum}
            />
          )}
          {/* Modal Delete Forum */}
          {deleteForumModal && (
            <DeleteForum
              aDeleteForum={aDeleteForum}
              idDeleteForum={idDeleteForum}
              setDeleteForumModal={setDeleteForumModal}
              getForum={getForum}
              idForum={forum.id}
            />
          )}
          {/* Modal Update Forum */}
          {updateForumModal && (
            <UpdateForum
              aUpdateForum={aUpdateForum}
              idUpdateForum={idUpdateForum}
              setUpdateForumModal={setUpdateForumModal}
              getForum={getForum}
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
                  <div className="ml-2 text-md font-medium ">Forums</div>
                  <div className="grid grid-cols-1 gap-4 justify-end h-[500px] mt-2 xl:w-[980px] w-[700px]">
                    <div className="flex justify-center shadow-sm">
                      <div className="bg-white border rounded-md h-auto shadow-lg w-full ">
                        <label className="flex justify-center items-center text-2xl text-dark font-medium p-3">
                          {" "}
                          Tabel Forum
                        </label>
                        {/* Alert create forum */}
                        {alertCreateForum && (
                          <div className="flex justify-evenly ">
                            <div className=" bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                              <strong className=" text-center font-bold text-sm">
                                Forum Berhasil Ditambahkan
                              </strong>{" "}
                            </div>
                          </div>
                        )}

                        {/* Alert delete forum */}
                        {alertDeleteForum && (
                          <div className="flex justify-evenly ">
                            <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                              <strong className=" text-center font-bold text-sm">
                                Forum Berhasil Dihapus
                              </strong>{" "}
                            </div>
                          </div>
                        )}

                        {/* Alert delete forum */}
                        {alertUpdateForum && (
                          <div className="flex justify-evenly ">
                            <div className=" bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                              <strong className=" text-center font-bold text-sm">
                                Forum Berhasil Diupdate
                              </strong>{" "}
                            </div>
                          </div>
                        )}

                        {/* START TABLE */}
                        <button
                          className="bg-green-400 hover:bg-green-600 text-white font-light py-1 px-2 rounded-md ml-3 mb-3"
                          onClick={() => setCreateForumModal(true)}
                        >
                          Create Forum
                        </button>
                        <div className="flex overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-200 ">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center"
                                >
                                  No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Icon
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Nama Forum
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Detail Forum
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
                            {forum.map((forum, index) => (
                              <tbody key={forum.id}>
                                <tr className="bg-white border-b border-gray-700">
                                  <th
                                    scope="row"
                                    className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap text-center"
                                  >
                                    {page * limit + index + 1}
                                  </th>
                                  <td className="px-3 py-2 w-auto">
                                    <img
                                      className="object-cover w-8 h-8"
                                      src={`http://localhost:5000/${forum.icon}`}
                                      alt="Iconr"
                                    />
                                  </td>
                                  <td className="px-3 py-2 w-auto">
                                    {forum.namaForum}
                                  </td>
                                  <td className="px-2 py-1 w-auto">
                                    {forum.detail}
                                  </td>
                                  <td className="px-2 py-1">
                                    {dayjs(forum.createdAt).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>

                                  <td className="flex px-2 mt-2 sm:items-center">
                                    <button
                                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-normal py-1 px-2 rounded-md"
                                      onClick={() => upForumModal(forum.id)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      key={forum.id}
                                      className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-2 rounded-md ml-5"
                                      onClick={() => delForumModal(forum.id)}
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
                  <label className="text-sm text-gray-700 mt-3">
                    Total Forum : {rows}, Page : {rows ? page + 1 : 0} of{" "}
                    {pages}
                  </label>

                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm xl:w-[980px] w-[700px]"
                    aria-label="Pagination"
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
