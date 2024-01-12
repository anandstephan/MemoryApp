import { useEffect, useState,useCallback } from "react"
import { Dimensions, FlatList,Text,View,Image,StyleSheet,Pressable, Alert, Button } from "react-native"
import { deleteUserDetail, getMemories } from "../../storage/storage"
import PostCard from "./components/PostCard"
import {  useIsFocused, useNavigation } from '@react-navigation/native';

const UserFeed = () =>{

    const [memories,setMemories]= useState([])
    const navigation = useNavigation()

    const focused = useIsFocused()
    if(focused){
        async function getData(){
            const res =  await getMemories()
             setMemories(res)
         }
         getData()        
    }

    const deleteUser = async () =>{
        console.log("hi333")
       await deleteUserDetail()
    
       navigation.navigate('Login')
    } 

    return <FlatList
        data={memories}
        style={{flex:1,backgroundColor:"#000"}}
        renderItem={({item})=><PostCard key={item.id} {...item}/>}
        ListEmptyComponent={()=> <View style={styles.container}>
        <Image
        source={{uri:"https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D"}}
        style={styles.img}
        />
        <Text style={styles.textStyle}>There is no Memory yet! please create now!</Text>
        <Pressable
                onPress={deleteUser}
                style={styles.registerContainer}
            >
                <Text style={styles.registerUserStyle}>
                Logout
                </Text>
            </Pressable>
            <Button title="Logout" style={styles.registerContainer} color="#39B68D"/>
        </View>
}
/>
}

export default UserFeed

const styles = StyleSheet.create({
    container:{
    justifyContent:"center",
    alignItems:"center",
    height:Dimensions.get('window').height/2
},
    img:{
        width:200,
        height:200,
        borderRadius:100
    },
    textStyle:{
    color:"#39B68D",
    fontSize:28,
    marginTop:40,
    marginHorizontal:30
    },
    registerContainer: {
        marginTop: 15,
       backgroundColor:"#39B68D",
       padding:10,
       width:120,
       borderRadius:40
      },
      registerUserStyle: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "600",
        textAlign : 'center',
       
      },
})