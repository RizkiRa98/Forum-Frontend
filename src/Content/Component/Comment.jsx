import React, { useEffect } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import DropdownComment from "./DropdownComment";

dayjs().format();
dayjs.extend(relativeTime);

export default function Comment({
  comment,
  userId,
  setModalComment,
  setModalUpdateComment,
  deleteCommentModal,
  updateCommentModal,
}) {
  return (
    <>
      <div className="mb-2 font-light text-lg">Comment</div>

      {comment.map((comment, id) => (
        <div key={comment.uuid} className="ml-2 mb-7">
          <div className="flex items-center ml-3 ">
            {comment.user && (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-button">
                <img
                  className="object-cover w-full h-full"
                  src={`http://localhost:5000/${comment.user.foto}`}
                  alt="Profile User"
                />
              </div>
            )}
            <div className="flex flex-col ml-3 w-auto">
              {comment.user && (
                <div className="text-md">{comment.user.name}</div>
              )}
            </div>
            <div className="flex justify-start w-auto">
              <div className="flex text-xs ml-4 mt-1 text-gray-500">
                {dayjs().diff(dayjs(comment.createdAt), "day") < 7
                  ? dayjs(comment.createdAt).fromNow()
                  : dayjs(comment.createdAt).format("YY-MM-DD")}
              </div>
            </div>
            {userId === comment.user.id && (
              <div className="flex flex-col -ml-6 w-auto">
                {/* Dropdown untuk komentar */}
                <DropdownComment
                  comment={comment.id}
                  deleteCommentModal={deleteCommentModal}
                  updateCommentModal={updateCommentModal}
                />
              </div>
            )}
          </div>
          <div className="flex items-center ml-14 mt-1">
            <div className="flex flex-col ml-2 w-9/12">
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: comment.isiComment }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
