import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import commonStyles from '../commonStyles'

export default (props) => {
  const formatteddate = moment(props.dateAt)
    .locale('pt-br')
    .format('D/MM/YYYY');

  return (
    <View style={styles.container}>
      <View style={styles.textCollect}>
        <Text style={styles.nomeCollect}>{props.nome}</Text>
      <Text>Cod: {props.cod}</Text>
      </View>
      <View style={{padding: 10}}>
        <Text>Quantidade: {props.qtd}</Text>
      </View>
    </View>
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
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
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
    marginBottom: 10,
  },
});
