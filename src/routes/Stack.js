import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator} from '@react-navigation/stack'
import CollectList from '../screens/CollectList'
import ItemList from '../screens/ItemList'
import Scanner from '../screens/Scanner'

const Stack = createStackNavigator()

export default (props) => {
    return(
    <View>
       <Stack.Navigator initialRouteName="CollectList"
            screenOptions={{headerShown:false}}
        >
          <Stack.Screen name="CollectList" component={CollectList} />
          <Stack.Screen name="ItemList" component={ItemList} />
          <Stack.Screen name="Scanner" component={Scanner}/>
        </Stack.Navigator>
        </View>
    )
}