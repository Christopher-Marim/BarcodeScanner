import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';
import Item from '../components/Item';

export default function ItemList (props) {

  const id = useSelector((state) => state.collects.currentID);
  const itensCollect = useSelector((state) => state.collects.collects[id])

    return (
      <View style={styles.container}>
       
        <View style={styles.headerView}>
    <Text style={styles.tittle}>{itensCollect.nome}</Text>
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

        <View style={styles.itemList}>
          <FlatList
            data={itensCollect.itens}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => (
              <View style={{padding: 3}}>
                <Item {...item}></Item>
              </View>
            )}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() =>props.navigation.navigate('Scanner')}
          activeOpacity={0.7}
        
        >
          <Icon name='plus' size={20} color={commonStyles.color.secondary}/>
        </TouchableOpacity>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flex: 1,
    backgroundColor: commonStyles.color.principal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    flex: 9,
    padding: 5,
  },
  tittle: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.color.secondary,
  },
  buttonGoBack: {
    position: 'absolute',
    left: 30,
    top: 30,
  },
  buttonOpenScanner:{
    position: 'absolute',
    right: 30,
    top: 30,
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
