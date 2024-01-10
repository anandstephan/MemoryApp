import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Pressable,
    Alert,
    Image,
    Button,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'react-native-image-picker';
import { createMemories, getUserDetail, resavePost, } from "../../storage/storage";
import shortid from "shortid";
  
  const EditPost = () => {
    // state management
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const navigation = useNavigation()
    const {params} = useRoute()

    useEffect(()=>{
        setTitle(params.title)
        setBody(params.body)
        setSelectedImage(params.img)
    },[params])
  
      // function for handling User Registeration
      const editMemory = async () => {
        if(title.length===0){
            Alert.alert("Title","Please Fill the Title")
        }else if(body.length===0){
            Alert.alert("Body","Please Fill the Body")
        }else if(selectedImage ===null || selectedImage.length === 0){
            Alert.alert("Image","Please Select the Image")
        }else{
            const res = await resavePost(params.id,title,body,selectedImage) 
            if(res==='Memory Updated'){
              Alert.alert("Message","Congratulation, You're Successfully Edit Memory",[{text:"OK",onPress:()=>navigation.navigate('Feed')}])
            }
        }
      
    };
      const uploadPic = async () =>{
        const result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
        })
       setSelectedImage(result.assets[0].uri)
      }
  
    return (
        <ScrollView style={{backgroundColor: "#000"}}>
      <View style={styles.container}>
       
        <KeyboardAvoidingView>
          <View style={styles.header}>
  
            <Text style={[styles.textStyle]}>
              Edit  Memory
            </Text>
          </View>
  
          <View style={{ marginTop: 50 }}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.textField}>Title</Text>
  
              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={[styles.textInput, { fontSize: title ? 16 : 14 }]}
                placeholderTextColor={"gray"}
                placeholder="Enter the Title"
              />
            </View>
  
            <View>
              <Text style={styles.textField}>Body</Text>
  
              <TextInput
                value={body}
                onChangeText={(text) => setBody(text)}
                style={[styles.textInput, { fontSize: body ? 16 : 14 }]}
                placeholderTextColor={"gray"}
                placeholder="Enter Body of the Memory!"
              />
            </View>
  
            <View style={{ marginTop: 10 }}>
              <Text style={styles.textField}>Image</Text>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image
            source={{uri:selectedImage}}
            style={styles.imgFile}
            />
            </View>

              <Button title="Upload Another Image" color={"#333"} onPress={uploadPic} />
            </View>
  
            <Pressable
              onPress={editMemory}
              style={styles.registerButton}
            >
              <Text style={styles.buttonTextStyle}>Edit Memory</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      
      </View>
      </ScrollView>
    );
  };
  export default EditPost;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 10,
      alignItems: "center",
      backgroundColor: "#000",
    },
    header: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    textStyle: {
      color: "#39B68D",
      fontSize: 27,
      fontWeight: "600",
    },
    textField: {
      fontSize: 18,
      fontWeight: "600",
      color: "#f2f2f3",
    },
    textInput: {
      borderBottomColor: "gray",
      borderWidth: 1,
      marginVertical: 10,
      width: 300,
      color: "#f1f1f1",
    },
    registerButton: {
      width: 200,
      backgroundColor: "#39B68D",
      padding: 15,
      marginTop: 50,
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 6,
    },
    loginUser: {
      textAlign: "center",
      color: "gray",
      fontSize: 16,
      fontWeight: "600",
    },
    imageStyle: {
      marginLeft: "5%",
      width: "200%",
    //   aspectRatio: 6, // Adjust the aspect ratio based on the image's original aspect ratio
    },
    buttonTextStyle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    imgFile:{
        width:200,
        height:200,
        marginBottom:20,
        borderRadius:100
    }
  });
  