import React from "react";
import { View,  StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from '../commonStyles'

export default (props) => {
  return (
    <View style={{flex:1}}>
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection:'row'}}>
                    <Avatar.Image 
                        source={{
                            uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                        }}
                        size={50}
                    />
                    <View style={{marginLeft:15, flexDirection:'column'}}>
                        <Title style={styles.title}>Christopher Marim</Title>
                        <Caption style={styles.email}>christopher.marim@etm.srv.br</Caption>
                    </View>
                </View>

                
            </View>

            <Drawer.Section style={styles.drawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="home-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Principal"
                    onPress={() => {props.navigation.navigate('CollectList')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="account-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Perfil"
                    onPress={() => {props.navigation.navigate('')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="send" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Bips"
                    onPress={() => {props.navigation.navigate('')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="settings-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Configurações"
                    onPress={() => {props.navigation.navigate('')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="account-check-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Support"
                    onPress={() => {props.navigation.navigate('')}}
                />
            </Drawer.Section>
           
        </View>
    </DrawerContentScrollView>
    <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem 
            icon={({color, size}) => (
                <Icon 
                name="exit-to-app" 
                color={color}
                size={size}
                />
            )}
            label="Sair"
            onPress={() => {signOut()}}
        />
    </Drawer.Section>
</View>
  );
};

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      backgroundColor: commonStyles.color.principal,
      paddingVertical:20,
      justifyContent:'center'
    },
    title: {
      fontSize: 16,
      fontWeight:commonStyles.fontWeight,
      marginTop: 3,
      fontWeight: 'bold',
      color:'white'
    },
    caption: {
      fontSize: 14,
      fontWeight:commonStyles.fontWeight,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight:"bold",
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 2
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    email:{
        fontSize: 10,
      fontWeight:commonStyles.fontWeight,
      lineHeight: 14,
      color:'white'
    }
});