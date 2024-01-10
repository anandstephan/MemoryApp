import { useEffect, useState,useCallback } from "react"
import { Dimensions, FlatList,Text,View,Image,StyleSheet } from "react-native"
import { getMemories } from "../../storage/storage"
import PostCard from "./components/PostCard"
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const UserFeed = () =>{

    const [memories,setMemories]= useState([])
    const [renderItem,setrenderItem] = useState(false)
    
    const focused = useIsFocused()
    if(focused){
        async function getData(){
            const res =  await getMemories()
             setMemories(res)
         }
         getData()        
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
    </View>}
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
    textStyle:{color:"#39B68D",fontSize:28,marginTop:40,marginHorizontal:30}
})