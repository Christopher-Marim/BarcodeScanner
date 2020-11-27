import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CollectList from "../screens/CollectList";
import Scanner from "../screens/Scanner";
import ScannerExpo from "../screens/ScannerExpo";
import ItemList from "../screens/ItemList";
import Stack from './Stack'

const Drawer = createDrawerNavigator();

export default (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack></Stack>
      </NavigationContainer>
    </SafeAreaView>
  );
};
