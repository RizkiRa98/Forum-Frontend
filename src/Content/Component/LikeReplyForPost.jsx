import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { FaHeart, FaComment } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

export default function LikeReplyForPost({
  postId,
  likes,
  likesForum,
  likeUser,
  userId,
  idForum,
  userIdForum,
  likeUserForum,
}) {
  // console.log(likeUserForum);
  // console.log(userId);
  // Use Params untuk mengambil parameter route

  const [liked, setLiked] = useState(false);
  const [likedForum, setLikedForum] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [likeCountForum, setLikeCountForum] = useState(likesForum);

  // State
  const [jmlhCommentPost, setJmlhCommentPost] = useState("");

  // // Method untuk fetch data jumlah komentar
  const getJmlhCommentPost = async () => {
    try {
      await axios
        .get(`http://localhost:5000/post/${postId}/jumlahCommentForPost`)
        .then((response) => {
          setJmlhCommentPost(response.data);
        });
    } catch (error) {}
  };

  // Call Method pada useEffect
  useEffect(() => {
    const isLiked = likeUser?.some((e) => e.userId === userId);
    setLiked(isLiked);

    getJmlhCommentPost();

    // console.log(getPostById);
  }, [likeUser, userId]);

  useEffect(() => {
    const isLikedForum = likeUserForum?.some((e) => e.userId === userIdForum);
    setLikedForum(isLikedForum);
  }, [userIdForum, likeUserForum]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/likes`, {
        postId,
        userId,
      });

      if (response.status === 201) {
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
      } else if (response.status === 200) {
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      }
    } catch (error) {}
  };

  const handleLikeByForum = async () => {
    const userId = userIdForum;
    try {
      const response = await axios.post(
        `http://localhost:5000/${idForum}/likes`,
        {
          postId,
          userId,
        }
      );
      if (response.status === 201) {
        setLikedForum(true);
        setLikeCountForum((prevCount) => prevCount + 1);
      } else if (response.status === 200) {
        setLikedForum(false);
        setLikeCountForum((prevCount) => prevCount - 1);
      }
    } catch (error) {}
  };

  return (
    <div className=" flex items-center ml-12 mt-2">
      <div className="flex flex-row ml-3 w-9/12">
        {/* Like */}
        <div className="text-lg font-semibold flex justify-items-center">
          {!idForum ? (
            <>
              {userId ? (
                <IconButton
                  variant="text"
                  className="flex justify-center items-center border-red-500 border-2 h-7 w-7"
                  onClick={handleLike}
                >
                  <motion.div
                    animate={{ scale: liked ? 1.2 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {liked ? <FaHeart color="red" /> : <FaHeart color="gray" />}
                  </motion.div>
                </IconButton>
              ) : (
                <IconButton
                  variant="text"
                  className="flex justify-center items-center border-red-500 border-2 h-7 w-7"
                  onClick={handleLike}
                  disabled="on"
                >
                  <motion.div
                    animate={{ scale: liked ? 1.2 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {liked ? <FaHeart color="red" /> : <FaHeart color="gray" />}
                  </motion.div>
                </IconButton>
              )}
            </>
          ) : (
            <>
              {userIdForum ? (
                <IconButton
                  variant="text"
                  className="flex justify-center items-center border-red-500 border-2 h-7 w-7"
                  onClick={handleLikeByForum}
                >
                  <motion.div
                    animate={{ scale: liked ? 1.2 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {likedForum ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaHeart color="gray" />
                    )}
                  </motion.div>
                </IconButton>
              ) : (
                <IconButton
                  variant="text"
                  className="flex justify-center items-center border-red-500 border-2 h-7 w-7"
                  onClick={handleLikeByForum}
                  disabled="on"
                >
                  <motion.div
                    animate={{ scale: liked ? 1.2 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {likedForum ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaHeart color="gray" />
                    )}
                  </motion.div>
                </IconButton>
              )}
            </>
          )}
        </div>
        {!idForum ? (
          <div className="items-center ml-2">
            {liked ? "" : ""}
            {likeCount}
          </div>
        ) : (
          <div className="items-center ml-2">
            {likedForum ? "" : ""}
            {likeCountForum}
          </div>
        )}

        {/* Reply */}

        <>
          <div className="items-center text-lg font-semibold text-dark ml-7">
            <IconButton
              variant="text"
              className="flex justify-center items-center border-blue-700 border-2 h-7 w-7 pointer-events-none"
            >
              <FaComment />
            </IconButton>
          </div>
          <div className="items-center ml-2">{jmlhCommentPost}</div>
        </>
      </div>
    </div>
  );
}
