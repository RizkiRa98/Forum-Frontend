import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { FaHeart, FaComment } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function LikeReply({ postId, likes, userId, likeUser }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  // Use Params untuk mengambil parameter route
  const { id } = useParams();

  // State
  const [jmlhComment, setJmlhComment] = useState("");

  // Method untuk fetch data jumlah komentar
  const getJmlhComment = async () => {
    try {
      await axios
        .get(`http://localhost:5000/post/${id}/jumlahComment`)
        .then((response) => {
          setJmlhComment(response.data);
          // console.log(response.data);
        });
    } catch (error) {}
  };

  // Call Method pada useEffect
  useEffect(() => {
    const isLiked = likeUser?.some((e) => e.userId === userId);
    setLiked(isLiked);
    getJmlhComment();
    // console.log(getPostById);
  }, [likeUser, userId]);

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

  return (
    <div className=" flex items-center ml-12 mt-2">
      <div className="flex flex-row ml-3 w-9/12">
        {/* Like */}
        <div className="text-lg font-semibold flex justify-items-center">
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
        </div>
        <div className="items-center ml-2">
          {" "}
          {liked ? "" : ""}
          {likeCount}
        </div>
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
          <div className="items-center ml-2">{jmlhComment}</div>
        </>
      </div>
    </div>
  );
}
