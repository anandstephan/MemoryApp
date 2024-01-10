import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import UserFeed from '../screens/Feed/UserFeed';
import { Text,Button,Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddPost from '../screens/Feed/AddPost';
import EditPost from '../screens/Feed/EditPost';
const Stack = createStackNavigator();

const  Navigation = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator
    initialRouteName='Signup'
    >
      <Stack.Screen name="Feed" component={UserFeed}
        options={{
          headerStyle:{
            backgroundColor:"#000"
          },
          headerTitle:"Loving Memories",
          headerTitleAlign:"center",
          headerTintColor:"#39B68D",
          headerRight: () => (
            <Pressable onPress={()=> navigation.navigate("AddPost")}>
              <Text style={{color:"#FFF",fontSize:35,marginRight:10}}>+</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="Login" component={Login}
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen name="Signup" component={Signup}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen name="AddPost" component={AddPost}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen name="EditPost" component={EditPost}
        options={{
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigation