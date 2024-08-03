import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";

import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import Post from "../components/Post";

function UserPage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data);
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    const getPosts = async () => {
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };
    getUser();
    getPosts();
  }, [username, showToast]);
  if (!user && loading) {
    // showToast("Error", "User not Found", "error");
    return (
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !loading) {
    // showToast("Error", "User not Found", "error");
    return <Text size={"xl"}>User not fount!</Text>;
  }
  return (
    <div>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1>User has no posts</h1>}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </div>
  );
}

export default UserPage;
