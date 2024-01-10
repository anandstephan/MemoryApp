import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../storage/storage";

 
  const Login = () => {
    // state manangement
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()

    const handleLogin = async () => {
        if(email.length===0){
          Alert.alert("Email","Please Fill the Email Field")
        }else if(password.length==0){
          Alert.alert("Password","Please Fill the Password")
        }else{
          const res = await login(email,password)
          if(res === "There is no User yet please signup first"){
             Alert.alert("Message",res,[{text:'Ok',onPress:()=>navigation.navigate("Signup")}]);
          }else if(res === "You're Successfully Login"){
             Alert.alert("Message",res,[{text:'Ok',onPress:()=>navigation.navigate("Feed")}]);
          }
        }

    };
  
    return (
      <ScrollView style={{backgroundColor:"#000"}}>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.header}>
            <Image
              source={require("../../images/logo.jpeg")}
              style={styles.imageStyle}
              resizeMode="contain"
            />
  
            <Text style={styles.textStyle}>Sign In</Text>
  
            <Text
              style={[
                styles.textStyle,
                { color: "#f3f1f1", marginTop: 15, fontSize: 16 },
              ]}
            >
              Sign In to your Account
            </Text>
          </View>
  
          {/* View for the form */}
          <View style={styles.formStyle}>
            {/* View holding email and textInput for email */}
            <View>
              <Text style={styles.textField}>Email</Text>
  
              <TextInput
                value={email}
                onChangeText={(email) => setEmail(email)}
                placeholder="Enter your Email id"
                placeholderTextColor={"gray"}
                style={[styles.textInputStyle, { fontSize: email ? 16 : 14 }]}
              />
            </View>
  
            {/* View holding password and textInput for password */}
            <View style={{ marginTop: 30 }}>
              <Text style={styles.textField}>Password</Text>
  
              <TextInput
                value={password}
                onChangeText={(password) => setPassword(password)}
                placeholder="Enter your Password"
                placeholderTextColor={"gray"}
                secureTextEntry
                style={[styles.textInputStyle, { fontSize: password ? 16 : 14 }]}
              />
            </View>
  
            {/* Button for Login */}
            <Pressable style={styles.buttonStyle} onPress={handleLogin}>
              <Text style={styles.buttonTextStyle}>Login</Text>
            </Pressable>
  
            {/* TouchableOpacity for Registering the user */}
            <Pressable
              onPress={() => navigation.navigate("Signup")}
              style={styles.registerContainer}
            >
              <Text style={styles.registerUserStyle}>
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
      </ScrollView>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      padding: 10,
      alignItems: "center",
     
    },
    header: {
      marginTop: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    textStyle: {
      marginTop: 30,
      color: "#39B68D",
      fontSize: 19,
      fontWeight: "600",
    },
    imageStyle: {
      width: "80%",
      aspectRatio: 6, // Adjust the aspect ratio based on the image's original aspect ratio
    },
    formStyle: {
      marginTop: 40,
    //   backgroundColor: '#333', // Set a background color for the form container
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    textField: {
      color: "#f2f2f3",
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 10, // Add margin-bottom to separate text from TextInput
    },
    textInputStyle: {
      borderBottomColor: "#333",
      borderBottomWidth: 1,
      marginVertical: -5,
      width: 300,
      padding: 2,
      color: "white",
    },
    buttonStyle: {
      width: 200,
      backgroundColor: "#39B68D",
      padding: 15,
      marginTop: 60,
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonTextStyle: {
      fontSize: 16,
      color: "white",
      fontWeight: "700",
      textAlign: "center",
    },
    registerContainer: {
      marginTop: 15,
     marginLeft:-30
    },
    registerUserStyle: {
      color: "gray",
      fontSize: 15,
      fontWeight: "600",
      // textAlign : 'center'
      marginLeft: "10%",
    },
  });
  