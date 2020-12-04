import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import {useSelector, useDispatch} from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import commonStyles from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Collect(props) {
  const [borderRadiusCONST, setborderRadius] = useState(10);

  const dispacth = useDispatch();

  const formatteddate = (collects) =>
    moment(collects.dateAt).locale('pt-br').format('D/MM/YYYY');

  const getLeftContent = () => {
    return (
      <View style={styles.containerSwipeable}>
        <TouchableOpacity style={styles.left1} activeOpacity={0.5}>
          <Icon name="send" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>{
            dispacth({type: 'SHOW_MODAL_EDTCOLLECT_ON'})
            dispacth({type:'CURRENT_ID', payload: [props.id]})
          }
            
          }
          style={styles.left2}
          activeOpacity={0.5}>
          <Icon name="pencil" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  const getRightContent = () => {
    return (
      <View style={styles.containerSwipeable}>
        <TouchableOpacity
          onPress={() => dispacth({type: 'DEL_COLLECT', payload: [props.id]})}
          style={styles.right}
          activeOpacity={0.5}>
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={getLeftContent}
      renderRightActions={getRightContent}
      onSwipeableWillOpen={() => setborderRadius(0)}
      onSwipeableWillClose={() => setborderRadius(10)}>
      <View
        style={[
          styles.container,
          {
            borderBottomLeftRadius: borderRadiusCONST,
            borderTopLeftRadius: borderRadiusCONST,
          },
        ]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {props.navigation.navigate('ItemList')
            dispacth({type:'CURRENT_ID', payload: [props.id]})
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <View style={styles.textCollect}>
              <Text style={styles.nomeCollect}>{props.nome}</Text>
              <Text style={{ fontWeight:commonStyles.fontWeight}}>Data: {formatteddate(`${props.dateAt}`)}</Text>
            </View>
            <View style={{justifyContent: 'center', padding: 10}}>
        <Text style={{ fontWeight:commonStyles.fontWeight}}>Coletas: {props.itens.length}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    elevation: 1,
    borderLeftWidth: 5,
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 10,
    paddingLeft: 15,
    borderRadius: 5,
    borderLeftColor: commonStyles.color.principal,
    backgroundColor: 'white',
  },
  textCollect: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
  },
  nomeCollect: {
    fontWeight:commonStyles.fontWeight,
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'space-between',
  },
  left1: {
    backgroundColor: '#194c9e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  left2: {
    backgroundColor: '#4287f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerSwipeable: {
    flexDirection: 'row',
  },
  right: {
    backgroundColor: '#bf1f1f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    
  },
});
