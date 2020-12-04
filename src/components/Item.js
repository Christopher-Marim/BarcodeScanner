import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import commonStyles from '../commonStyles'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';



export default (props) => {

    const [borderRadiusCONST, setborderRadius] = useState(10);

    const dispatch = useDispatch();
  
    const getLeftContent = () => {
      return (
        <View style={styles.containerSwipeable}>
          <TouchableOpacity
            onPress={() =>{
              dispatch({type: 'SHOW_MODAL_EDTITEM_ON'})
              dispatch({type:'CURRENT_ID_ITEM', payload: [props.id]})
            }
              
            }
            style={styles.left2}
            activeOpacity={0.5}>
            <Icon name="pencil" size={20} color="white" />
          </TouchableOpacity>
        </View>
      );
    };

    function DelItem() {
      dispatch({type: 'DEL_ITEM', payload: [props.id]})
      dispatch({type: 'REFRESH', payload:[true]})
      setInterval(() => {
        dispatch({type: 'REFRESH', payload:[false]})
       }, 1000)
    }
    const getRightContent = () => {
      return (
        <View style={styles.containerSwipeable}>
          <TouchableOpacity
            onPress={DelItem}
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
    <View style={[
          styles.container,
          {
            borderBottomLeftRadius: borderRadiusCONST,
            borderTopLeftRadius: borderRadiusCONST,
          },
        ]}>
      <View style={styles.textCollect}>
        <Text style={styles.nomeCollect}>{props.nome}</Text>
      <Text style={{fontWeight:commonStyles.fontWeight}}>Cod: {props.cod}</Text>
      </View>
      <View style={{padding: 10}}>
        <Text style={{fontWeight:commonStyles.fontWeight,}}>Quantidade: {props.qtd}</Text>
      </View>
    </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation:1,
    borderLeftWidth: 5,
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 10,
    paddingLeft: 15,
    borderRadius: 5,
    borderLeftColor: commonStyles.color.principal,
    backgroundColor:'white'
    
  },
  textCollect: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
  },
  nomeCollect: {
    fontSize: 20,
    fontWeight:commonStyles.fontWeight,
    marginBottom: 10,
  },
  left2: {
    backgroundColor: '#4287f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
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
