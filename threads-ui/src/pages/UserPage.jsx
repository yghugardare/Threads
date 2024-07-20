import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"


function UserPage() {
  return (
    <div>
        <UserHeader/>
        <UserPost likes={123} replies={30} postImg={"/post1.png"} postTitle={"This is Post 1 with Post Image and Title"}/>
        <UserPost likes={123} replies={30} postImg={"/post2.png"} postTitle={"This is Post 2 with Post Image and Title"}/>
        <UserPost likes={883} replies={3} postTitle={"This is Post 3 with just Post Title"}/>
        <UserPost likes={7113} replies={21} postImg={"/post3.png"} postTitle={"This is Post 4 with Post Image and Title"}/>
    </div>
  )
}

export default UserPage