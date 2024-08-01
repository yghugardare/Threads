import { AddIcon } from "@chakra-ui/icons";
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
const MAX_CHAR=500
function CreatePost() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText,setPostText]=useState("")
    const imageRef = useRef(null)
    const {handleImageChange,imgUrl,setImgUrl}  = usePreviewImg();
    const [remaingChars, setRemaingChars] = useState(MAX_CHAR)
    const [loading, setLoading] = useState(false);
    const showToast =  useShowToast();
    const user = useRecoilValue(userAtom)
    const handleTextChange = (e)=>{
        const inputText = e.target.value;
        if(inputText.length > MAX_CHAR){
            const truncateText = inputText.slice(0,MAX_CHAR);
            setPostText(truncateText);
            setRemaingChars(0);
        }else{
            setPostText(inputText);
            setRemaingChars(MAX_CHAR-inputText.length)
        }
        
    }
    const handleCreatePost =async ()=>{
        try {
            setLoading(true)
            const res = await fetch("/api/posts/create",{
                method:"POST",
                headers : {
                    "Content-Type":"application/json"
                },
                body : JSON.stringify({postedBy:user._id,text:postText,img:imgUrl})
            });
            const data = res.json();
            if(data.error){
                showToast("Error",data.error,"error");
                return;
            }
            showToast("Success","Post Created Successfully!","success");
            setImgUrl("")
           setPostText("")
            onClose();
        } catch (error) {
           showToast("Error",error,"error");
           
        }finally{
            setLoading(false);
        }
    }
  return (
    <div>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        size={{ base: "sm", sm: "md" }}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        <AddIcon /> &nbsp; Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalBody pb={6} py={2}>
                <FormControl>
                    <Textarea 
                    h={40}
                    value={postText}
                    onChange={e => handleTextChange(e)}
                    placeholder="Post content goes here..."
                    outline={"none"}

                    />
                    <Text color={useColorModeValue("gray.800","gray.400")} textAlign={"right"} fontWeight={"bold"} fontSize={"xs"} m={1} >
                        {remaingChars}/{MAX_CHAR}
                    </Text>
                    <Input type="file" ref={imageRef} hidden onChange={e => handleImageChange(e)}/>
                    <BsFillImageFill style={{
                        marginLeft:"5px",
                        cursor:"pointer"
                    }}
                    size={16}
                    onClick={()=>imageRef.current.click()}
                    />
                </FormControl>
                {
                    imgUrl && (
                        <Flex
                        w={"full"}
                        mt={5}
                        position={"relative"}
                        
                        >
                            <Image src={imgUrl} alt="Post Image" rounded={"lg"}/>
                            <CloseButton
                            onClick={()=>{
                                setImgUrl("")
                            }}
                            position={"absolute"}
                            right={1}
                            top={2}
                            size={"sm"}
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            bg={useColorModeValue("gray.100","gray.800")}
                            />
                        </Flex>
                    )
                }
            </ModalBody>
            <ModalFooter>
                <Button
                colorScheme="blue"
               isLoading={loading}
               onClick={handleCreatePost}
                >
                    Post
                </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CreatePost;
