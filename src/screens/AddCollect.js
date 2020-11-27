import React from 'react';
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
import {useDispatch, useSelector, connect} from 'react-redux';
import commonStyles from '../commonStyles';

export default function AddList() {
  const [collectName, setCollectName] = useState('');
  const statusModal = useSelector((state) => state.showModal.showModalADDCOLLECT);

  const dispatch = useDispatch();

  function addCollect() {
    if (!collectName || !collectName.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não Informada!');
      return;
    } else {
      dispatch({type: 'ADD_COLLECT', payload:[collectName, new Date()]});
      closeModal()
      setCollectName('')
      dispatch({type: 'REFRESH', payload:[true]})
      setInterval(() => {
        dispatch({type: 'REFRESH', payload:[false]})
       }, 1000)
      

    }
  }
  function closeModal() {
    dispatch({type: 'SHOW_MODAL_ADDCOLLECT_OFF'});
  }

  return (
    <Modal
      transparent={true}
      visible={statusModal}
      onRequestClose={closeModal}
      animationType="slide">
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
          <Text style={styles.headerModal}>Nova Coleta</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe a Descrição"
            onChangeText={(text) => setCollectName(text)}
            value={collectName}
          />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addCollect}>
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
    height: 40,
    marginTop: 10,
    margin: 15,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: 'grey',
    borderRadius: 6,
    backgroundColor: '#f1f2f4',
  },
});
