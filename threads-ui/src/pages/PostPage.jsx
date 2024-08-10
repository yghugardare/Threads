import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
// import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { formatDistanceToNow } from "date-fns";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";

function PostPage() {
  // const [liked, setLiked] = useState(false);
  const [post, setPost] = useState();
  const { loading, user } = useGetUserProfile();
  const {pid} = useParams();
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const currentUser = useRecoilValue(userAtom);
  
  const showToast = useShowToast()
  const { colorMode } = useColorMode();
  useEffect(() => {
    // console.log(user);
    const getPost = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data =  await res.json();
        if(data.error){
          showToast("Error",data.error,"error");
          return;
        }
        setPost(data);
      } catch (error) {
        showToast("Error",error,"error");
      }finally{
        setFetchingPosts(false);
      }

    }
    
    getPost()
   
  }, [pid,showToast]);
  const handleDelete = async ()=> {
    try {
      if(!window.confirm("Are you sure that you want to delete this post?")) return;
      const res = await fetch(`/api/posts/${post?._id}`,{
        method : "DELETE"
      })
      const data = await res.json();
      if(data.error){
        showToast("Error",data.error,"error");
        return;
      }
      showToast("Success!",data.message,"success");
    } catch (error) {
      showToast("Error",error,"error");
    }
  }
 if(!user && loading){
  return (
    <Flex justifyContent={"center"}>
      <Spinner size={"xl"}/>
    </Flex>
  )
 }
//  console.log(post)
 if(fetchingPosts){
  return (
    <Flex justifyContent={"center"}>
      <Spinner size={"xl"}/>
    </Flex>
  )
 }
 if(!post){
  return <Text fontSize={"xxx-large"} textAlign={"center"}>No Post Found🤔</Text>
 }
  return (
    <>
      {/* Part 1 */}
      <Flex w={"full"} alignItems={"center"} gap={3}>
        {/* image + username and verification tick */}
        <Avatar size={"md"} name={user.name} src={user.profilePic || ""} />
        {/* name and verification */}
        <Flex alignItems={"center"} w={"full"}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user.username}
          </Text>
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Flex>
        {/* 1day ago and three dot */}
        <Flex alignItems={"center"} gap={3}>
          <Text color={"gray.light"} fontSize={"xs"} width={36} textAlign={"right"}>{formatDistanceToNow(new Date(post?.createdAt))}</Text>
          {
            currentUser._id === user._id && (
              <DeleteIcon size={20} cursor={"pointer"} onClick={handleDelete}/>
            )
          }
        </Flex>
      </Flex>
      {/* Part 2 */}
      <Text my={3}>{post.text}</Text>
      {/* Part 3 */}
      {
        post.img && (
          <Box
        overflow={"hidden"}
        borderRadius={6}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={post.img} w={"full"}></Image>
      </Box>
        )
      }
      {/* Part 4 */}
      <Flex gap={3} my={3} cursor={"pointer"}>
        <Actions post={post} />
      </Flex>
      {/* Part 5 */}
      {/* <Flex alignItems={"center"} gap={2}>
        <Text fontSize={"sm"} color={"gray.light"}>
          31 replies
        </Text>
        <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
        <Text fontSize={"sm"} color={"gray.light"}>
          {238 + (liked ? 1 : 0)} likes
        </Text>
      </Flex> */}
      {/* Part 6 */}
      <Divider
        my={4}
        borderColor={colorMode === "dark" ? "gray.light" : "gray.dark"}
      />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>
            Get the app to like , reply and Post.
          </Text>
        </Flex>
        <Button bg={colorMode === "light" ? "gray.300" : "gray.light"}>
          Get
        </Button>
      </Flex>
      <Divider
        my={4}
        borderColor={colorMode === "dark" ? "gray.light" : "gray.dark"}
      />
      {/* Part 7 Comment  */}
      {
        post.replies.map(reply => (
          <Comments
          key={reply._id}
         reply = {reply}
         lastReply={reply._id === post.replies[post.replies.length-1]._id}
      />
        ))
      }
      {/* <Comments
        username={"Yash Ghugardare"}
        comment={"Hey! Any job openings at Meta ?"}
        likes={1000}
        createdAt={1}
        userAvatar={""}
      />
      <Comments
        username={"Bill Gates"}
        comment={"Hey! Mark what's going on Buddy?!"}
        likes={69}
        createdAt={3}
        userAvatar={""}
      />
      <Comments
        username={"Elon Musk"}
        comment={
          "You suck Mark! Btw Yash , we are interested in hiring you. Come to Tesla 😎"
        }
        likes={89}
        createdAt={1}
        userAvatar={""}
      /> */}
    </>
  );
}

export default PostPage;
