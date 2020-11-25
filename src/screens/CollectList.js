
import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert,SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux'
import Modal from './AddCollect'

import commonStyles from '../commonStyles';
import Collect from '../components/Collect';
import EditCollect from '../screens/EditCollect'


export default function CollectList ({navigation}) {
  const collects = useSelector(state => state.collects.collects);

  const dispatch = useDispatch();

    return (
      <SafeAreaView style={styles.container}>
        <Modal></Modal>
        <EditCollect></EditCollect>
        <View style={styles.headerView}>
          <Text style={styles.tittle}>BarcodeScanner</Text>
        </View>
        <View style={styles.collectList}>
          <FlatList
            data={collects}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => <View style={{padding:3}}><Collect {...item} navigation={navigation}></Collect></View>}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() =>dispatch({type:'SHOW_MODAL_ADDCOLLECT_ON'})}
          activeOpacity={0.7}
        >
          <Icon name='plus' size={20} color={commonStyles.color.secondary}/>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20
  },
  headerView: {
    flex: 1,
    backgroundColor: commonStyles.color.principal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectList: {
    flex: 9,
    padding: 5,
    
  },
  tittle: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: 'white',
  },
  addButton:{
    position:'absolute',
    right:30,
    bottom:30,
    width:50,
    height:50,
    borderRadius:25,
    justifyContent:"center",
    alignItems:'center',
    backgroundColor:commonStyles.color.principal
  }
});
