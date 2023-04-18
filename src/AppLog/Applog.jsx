import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/NavbarUser";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import ReactPaginate from "react-paginate";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Applog() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // Decode jwt token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setRole(decoded.roleId);
        // setLogin(true);
      });
    } catch (error) {}
  };

  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  useEffect(() => {
    const getLogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/logger?page=${currentPage}`
        );
        setLogs(response.data.logs);
        setTotalPage(response.data.totalPage);
        setCurrentPage(parseInt(response.data.currentPage));
        // console.log(response.data);
      } catch (error) {
        navigate("/PageNotFound");
      }
    };

    getLogs();
  }, [currentPage]);

  // hitung indeks data yang akan ditampilkan pada halaman ini
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {role !== "" ? (
        <>
          {role === "admin" ? (
            <>
              <Navbar />
              <Sidebar />

              <div
                className="flex justify-center mt-20 sm:ml-14 mx-2
"
              >
                <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-end sm:w-6/12 w-full">
                  <div className="ml-2 text-md font-medium ">App Log</div>
                  <div className="grid grid-cols-1 gap-4 justify-end h-[500px] mt-2 xl:w-[980px] w-[700px]">
                    <div className="flex justify-center shadow-sm">
                      <div className="bg-white border rounded-md h-auto shadow-lg w-full ">
                        <label className="flex justify-center items-center text-2xl text-dark font-medium p-3">
                          {" "}
                          App Logger
                        </label>
                        {/* START TABLE */}
                        <div className="flex overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-200 ">
                              <tr>
                                <th
                                  scope="col"
                                  className="pl-1 py-2 text-center"
                                >
                                  No
                                </th>
                                <th scope="col" className="px-2 py-2">
                                  Method
                                </th>
                                <th scope="col" className="px-2 py-2">
                                  URL
                                </th>
                                <th scope="col" className="px-2 py-2">
                                  User
                                </th>
                                <th scope="col" className="px-2 py-2">
                                  Status
                                </th>
                                <th scope="col" className="px-2 py-2 text-left">
                                  Timestamp
                                </th>
                              </tr>
                            </thead>

                            {logs.map((log, index) => {
                              return (
                                <tbody key={index}>
                                  <tr className="bg-white border-b border-gray-700">
                                    <th
                                      scope="row"
                                      className="pl-1 py-1 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                      {startIndex + index + 1}
                                    </th>
                                    <td className="px-2 py-2 w-auto">
                                      {log.method}
                                    </td>
                                    <td className="px-2 py-2 w-auto">
                                      {log.url}
                                    </td>
                                    <td className="px-2 py-2 w-auto">
                                      {log.user}
                                    </td>
                                    <td className="px-2 py-2 w-auto">
                                      {log.status}
                                    </td>
                                    <td className="px-2 py-2 w-auto">
                                      {log.timestamp}
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                          </table>
                        </div>
                      </div>
                    </div>
                    <label className="text-sm text-gray-700 mt-3">
                      Page : {currentPage}
                    </label>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm xl:w-[980px] w-[700px]"
                      aria-label="Pagination"
                    >
                      <ReactPaginate
                        previousLabel={"< Prev"}
                        nextLabel={"Next >"}
                        pageCount={totalPage}
                        onPageChange={(selectedPage) => {
                          setCurrentPage(selectedPage.selected + 1);
                        }}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={3}
                        containerClassName="flex flex-1 items-end justify-end mt-2"
                        activeLinkClassName="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                        previousLinkClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        nextLinkClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        pageLinkClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 mx-1"
                      />
                    </nav>
                  </div>
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
