import axios from "axios";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

export default function DeleteForum({
  setDeleteForumModal,
  idDeleteForum,
  aDeleteForum,
  getForum,
}) {
  // set animation InView
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const deleteForum = async () => {
    await axios.delete(`http://localhost:5000/forum/${idDeleteForum}`);
    aDeleteForum();
    getForum();
    setDeleteForumModal(false);
  };
  console.log(idDeleteForum);
  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              ref={ref}
              style={{
                transform: isInView ? "none" : "translateY(-200px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
            >
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Hapus Forum?</h3>
                <button
                  className="p-1 ml-auto  border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setDeleteForumModal(false)}
                >
                  <span className="bg-black text-black  h-6 w-6 text-2xl  ">
                    <AiOutlineClose />
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Forum ini akan hilang untuk selamanya, anda yakin ?
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-dark background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setDeleteForumModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={deleteForum}

                  // onClick={() => setModalComment(false)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
}
