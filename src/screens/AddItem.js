import React, {useRef} from 'react';
import {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import commonStyles from '../commonStyles';

export default function AddList(props) {
  const [ItemQtd, setItemQtd] = useState("");
  
  
  const statusModal = useSelector((state) => state.showModal.showModalADDITEM);
  const id = useSelector((state) => state.collects.currentID);


  const dispatch = useDispatch();

  const ref_input2 = useRef();

  // Função para Adicionar um novo item a lista de itens, verificando se a variavel ItemName foi preenchida, 
  // caso não Retorna um Alert, caso tanto a descrição quanto a quantidade tenham sido preenchidas, add item, fecha a modal, 
  // reseta o estado dos textInput's, retorna para a screen de ItemList e faz o refresh na mesma
  
  function addItem({navigation = false}) {
  //  if (!ItemName || !ItemName.trim()) {
  //    Alert.alert('Dados Inválidos', 'Descrição não Informada!');
  //    return;
  //  }if(!ItemQtd || !ItemQtd.trim()){
  //      Alert.alert('Dados Inválidos', 'Quantidade não Informada!');
      
  //  }

 //  else {
      dispatch({type: 'ADD_ITEM', payload:[0, props.cod, props.cod, parseInt(ItemQtd,10)]});
      closeModal()
      setItemQtd("")  
      if(navigation != false){

        navigation.goBack();
      }
      
        dispatch({type: 'REFRESH', payload:[true]})
        setInterval(() => {
          dispatch({type: 'REFRESH', payload:[false]})
         }, 1000)
      
  //  }
  }
  function closeModal() {
    dispatch({type: 'SHOW_MODAL_ADDITEM_OFF'});
  }

  return (
      
    <Modal
      transparent={true}
      visible={statusModal}
      onRequestClose={closeModal}
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
            <Text style={styles.headerModal}>{props.cod}</Text>
          <TextInput
            style={styles.input}
            ref={ref_input2}
            placeholder="Informe a Quantidade"
            onChangeText={(text) => setItemQtd(text)}
            value={ItemQtd}
            
            keyboardType="number-pad"
          />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addItem}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    flex: 1,
  },
  container: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '95%',
  },
  headerModal: {
    fontFamily: commonStyles.fontFamily,
    fontWeight:commonStyles.fontWeight,
    backgroundColor: commonStyles.color.principal,
    color: commonStyles.color.secondary,
    fontSize: 18,
    textAlign: 'center',
    padding: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.color.today,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    paddingHorizontal:5,
    fontWeight:commonStyles.fontWeight,
    height: 40,
    marginTop: 10,
    margin: 15,
    borderBottomWidth: 2,
    borderColor: 'grey',
    borderRadius: 6,
    backgroundColor: '#f1f2f4',
  },
});
