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
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'react-native-image-picker';
import { getUserDetail, signup } from "../../storage/storage";
import shortid from "shortid";
  
  const Signup = () => {
    // state management
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const navigation = useNavigation()

      // function for handling User Registeration
      const handleRegister = async () => {
        console.log("sel",selectedImage)
  
        if(name.length==0){
          Alert.alert("Name","Please Fill the Name Field")          
        }
        else if(selectedImage===null || selectedImage.length==0){
          Alert.alert("Image","Please Selected Image")
        }
        else if(email.length===0){
          Alert.alert("Email","Please Fill the Email Field")
        }else if(password.length==0){
          Alert.alert("Password","Please Fill the Password")
        }else{
          const res =    await signup(shortid.generate(), name,email,password,selectedImage) 
          if(res==='User Added Successfully'){
            Alert.alert("Message","Congratulation, You're Successfully Added, Please Login Now",[{text:"OK",onPress:()=>navigation.navigate('Login')}])
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
            <Image
              source={require("../../images/logo.jpeg")}
              style={styles.imageStyle}
              resizeMode="contain"
            />
  
            <Text style={styles.textStyle}>Register</Text>
  
            <Text style={[styles.textStyle, { marginTop: 15, color: "#f3f1f1" }]}>
              Register To your Account
            </Text>
          </View>
  
          <View style={{ marginTop: 50 }}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.textField}>Name</Text>
  
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={[styles.textInput, { fontSize: name ? 16 : 14 }]}
                placeholderTextColor={"gray"}
                placeholder="Enter your name"
              />
            </View>
  
            <View>
              <Text style={styles.textField}>Email</Text>
  
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={[styles.textInput, { fontSize: email ? 16 : 14 }]}
                placeholderTextColor={"gray"}
                placeholder="Enter Your Email!"
              />
            </View>
  
            <View style={{ marginTop: 10 }}>
              <Text style={styles.textField}>Password</Text>
  
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={[styles.textInput, { fontSize: password ? 16 : 14 }]}
                placeholderTextColor={"gray"}
                placeholder="Enter your password here!"
              />
            </View>
  
            <View style={{ marginTop: 10 }}>
              <Text style={styles.textField}>Image</Text>
  
          
  
              {selectedImage ? <Image source={{uri:selectedImage}} style={styles.imgFile}/> :   <Button title="Upload Image" color={"#333"} onPress={uploadPic} />}
            </View>
  
            <Pressable
              onPress={handleRegister}
              style={styles.registerButton}
            >
              <Text style={styles.buttonTextStyle}>Register</Text>
            </Pressable>
  
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={{ marginTop: 15 }}
            >
              <Text style={styles.loginUser}>
                Already Have an account? Sign in
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      
      </View>
      </ScrollView>
    );
  };
  export default Signup;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 10,
      alignItems: "center",
      backgroundColor: "#000",
    },
    header: {
      marginTop: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    textStyle: {
      color: "#39B68D",
      fontSize: 17,
      fontWeight: "600",
    },
    textField: {
      fontSize: 18,
      fontWeight: "600",
      color: "#f2f2f3",
    },
    textInput: {
      borderBottomColor: "gray",
      borderBottomWidth: 1,
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
      // aspectRatio: 6, // Adjust the aspect ratio based on the image's original aspect ratio
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
      borderRadius:100,
      marginLeft:40
  }
  });
  