import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';
import Item from '../components/Item';

export default function ItemList (props) {

  const id = useSelector((state) => state.collects.currentID);
  const itensCollect = useSelector((state) => state.collects.collects[id])
  const refresh = useSelector((state) => state.collects.refresh)

    return (
      <SafeAreaView style={styles.container}>
       
        <View style={styles.headerView}>
    <Text style={styles.text}>{itensCollect.nome}</Text>
        </View>
        <View style={styles.buttonGoBack}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <View>
              <Icon name="chevron-left" size={25} color="white"></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonOpenScanner}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Scanner')}>
            <View>
              <Icon name="qrcode" size={25} color="white"></Icon>
            </View>
          </TouchableOpacity>
        </View>
        {itensCollect.itens.length > 0 && (
          <View style={{ flex:9 }}>
        <View style={styles.itemList}>
          <FlatList
            data={itensCollect.itens}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => (
              <View style={{padding: 3}}>
                <Item {...item}></Item>
              </View>
            )}
            refreshControl={<RefreshControl refreshing={refresh}/>}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() =>props.navigation.navigate('Scanner')}
          activeOpacity={0.7}
        >
          <Icon name='plus' size={20} color={commonStyles.color.secondary}/>
        </TouchableOpacity>
        </View>
        )}
         {itensCollect.itens.length == 0 && (
           <View style={{flex:9, justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity style={styles.addButtonCenter} onPress={() =>props.navigation.navigate('Scanner')}
          activeOpacity={0.7}
        
        >
          <Text style={styles.textButton}>Scann Iten</Text>
        </TouchableOpacity>
           </View>
         )}
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
    backgroundColor:commonStyles.color.itensPrincipal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    padding: 5,
  },
  text: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 25,
    color: commonStyles.color.secondary,
    borderBottomWidth: 2,
    borderBottomColor:'#FFF',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
  },
  buttonGoBack: {
    position: 'absolute',
    left: 30,
    top: 40,
    height:50,
    width:50,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
    
  },
  buttonOpenScanner:{
    position: 'absolute',
    right: 30,
    top: 40,
    height:50,
    width:50,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
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
  },
  addButtonCenter:{
    position:'absolute',
    width:200,
    height:50,
    borderRadius:5,
    justifyContent:"center",
    alignItems:'center',
    backgroundColor:commonStyles.color.itensPrincipal

  },
  textButton: {
    fontSize:20,
    color: commonStyles.color.secondary
  }
});
