import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

function UserPage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      }
    };
    getUser();
  }, [username]);
  if (!user) {
    // showToast("Error", "User not Found", "error");
    return null;
  }
  return (
    <div>
      <UserHeader />
      <UserPost
        likes={123}
        replies={30}
        postImg={"/post1.png"}
        postTitle={"This is Post 1 with Post Image and Title"}
      />
      <UserPost
        likes={123}
        replies={30}
        postImg={"/post2.png"}
        postTitle={"This is Post 2 with Post Image and Title"}
      />
      <UserPost
        likes={883}
        replies={3}
        postTitle={"This is Post 3 with just Post Title"}
      />
      <UserPost
        likes={7113}
        replies={21}
        postImg={"/post3.png"}
        postTitle={"This is Post 4 with Post Image and Title"}
      />
    </div>
  );
}

export default UserPage;
