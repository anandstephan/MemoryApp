import { Image, View,StyleSheet,Text, Alert } from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import Icon from 'react-native-vector-icons/FontAwesome';
import { deletePost, editPost, getUserDetail, likePost, UnLikePost } from "../../../storage/storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


const PostCard = ({title,body,img,id}) =>{

    const navigation = useNavigation()
    const [likePress,setLikePress] = useState(false)
    const onDeletePost = async (id) =>{
        Alert.alert("Delete","Are you sure you want to delete",[{
            text:"Ok",
            onPress:()=>deletePost(id)
        },{
            text:'Cancel',
            onPress:()=>{}
        }])
    }
    const onEditPost = async id =>{
        const post = await editPost(id)
        console.log("pp",post)
        navigation.navigate('EditPost',post)
    }
    const likeFn = async (postId) =>{
        const userDetail = await getUserDetail()
        console.log("LikePress",UnLikePost)
        if(!likePress)
        await likePost(postId,userDetail.id)
        else
        await UnLikePost(postId,userDetail.id)
        setLikePress(!likePress)
    }

return <View style={style.container}>
        <View style={style.header}>
         <Image
         source={{uri:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"}}
         style={style.icon}
         />
         <View style={style.rowContainer}>
         <Pressable onPress={()=>onEditPost(id)}>
            <Text style={style.followBtn}>Edit  </Text>
         </Pressable>
         <Pressable onPress={()=>onDeletePost(id)}>
            <Text style={style.followBtn}>Delete</Text>
         </Pressable>
         </View>
        </View>
        <Text style={style.heading}>{title}</Text>
        <Image
        style={style.img}
        source={{uri:img}}
        />
        <View style={style.interaction}>
        <Pressable onPress={()=>likeFn(id)}>
        <Icon name={likePress?"heart":"heart-o"} size={30} color="#39B68D" />
        </Pressable>
       
        </View>
        <View>
        <Text style={style.body} >{body}</Text>
        </View>
</View>
}

export default PostCard

const style = StyleSheet.create({
    container:{
        padding:15,
        backgroundColor:"#000"
    },
    body:{
        color:"#39B68D",
        fontSize:20
        
    },
    img:{
        margin:5,
        width:'100%',
        height:200,
        borderRadius:15,
        borderColor:"#39B68D",
        borderWidth:2
    },
    icon:{
        width:50,
        height:50,
        borderRadius:50,
        marginBottom:10
    },
    interaction:{
        margin:5,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center", 
    },
    heading:{
        color: "#39B68D",
        fontSize: 25,
        fontWeight: "600",
    },
    followBtn:{
        backgroundColor:"#39B68D",
        padding:8,
        color:"#FFF",
        borderRadius:25
    },
    rowContainer:{
        flexDirection:'row',
        width:115,
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:10,
        paddingHorizontal:2,
    }
})