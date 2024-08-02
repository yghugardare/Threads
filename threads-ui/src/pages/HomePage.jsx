import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const showToast = useShowToast();
  useEffect(() => {
    const getFeedPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/feed`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "erroor");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast]);
  return (
    <>
      {!loading && posts.length === 0 && (
        <h1>Follow some user to see the feed at the Home page!!</h1>
      )}
      {loading && (
        <Flex justify={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {
        posts.map(post => (
          <Post key={post._id} post={post} postedBy={post.postedBy}/>
        ))
      }
    </>
  );
}

export default HomePage;
