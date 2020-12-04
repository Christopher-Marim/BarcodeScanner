import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Icon from "react-native-vector-icons/FontAwesome";
import commonStyles from "../commonStyles";
import Item from "../components/Item";
import EditItem from "./EditItem";
import AddItem from "./AddItem";

export default function ItemList(props) {
  const id = useSelector((state) => state.collects.currentID);
  const itensCollect = useSelector((state) => state.collects.collects[id]);
  const refresh = useSelector((state) => state.collects.refresh);
  const statusModal = useSelector((state) => state.showModal.showModalADDITEM);
  const [ItemCod, setItemCod] = useState("");
  const [ItemCodAux, setItemCodAux] = useState("");

  const dispatch = useDispatch();

  // faz o Refresh nos Itens, para atualizar o FlatList
  const onRefresh = () => {
    dispatch({ type: "REFRESH", payload: [true] });
    setInterval(() => {
      dispatch({ type: "REFRESH", payload: [false] });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <EditItem />
      <AddItem cod={ItemCodAux} />
      <View style={styles.headerView}>
        <Text style={styles.text}>{itensCollect.nome}</Text>
        <View style={styles.buttonGoBack}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <View>
              <Icon name="chevron-left" size={25} color="white"></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonOpenScanner}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Scanner")}
          >
            <View>
              <Icon name="qrcode" size={25} color="white"></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {itensCollect.itens.length > 0 && (
        <View style={{ flex: 9 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.itemList}>
              <FlatList
                data={itensCollect.itens}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                  <View style={{ padding: 3 }}>
                    <Item {...item}></Item>
                  </View>
                )}
                refreshControl={
                  <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
              />
            </View>
            {/*<TouchableOpacity style={styles.addButton} onPress={() =>props.navigation.navigate('Scanner')}
          activeOpacity={0.7}
        >
        <Icon name='plus' size={20} color={commonStyles.color.secondary}/>
            </TouchableOpacity>*/}

            <View style={styles.boxTextInput}>
              <View style={styles.itensBoxTextInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Código"
                  onChangeText={(text) => setItemCod(text)}
                  value={ItemCod}
                  keyboardType={"numeric"}
                />
                <TouchableOpacity
                  style={{ bottom:13, right:0, position:'absolute' }}
                  onPress={() => {
                    dispatch({ type: "SHOW_MODAL_ADDITEM_ON" });
                    setItemCodAux(ItemCod)
                    setItemCod('')
                  }}
                  activeOpacity={0.8}
                >
                  <Icon
                    name="plus-square"
                    size={48}
                    color={commonStyles.color.itensPrincipal}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      {itensCollect.itens.length == 0 && (
        <View
          style={{ flex: 9, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ flex: 8, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={styles.addButtonCenter}
              onPress={() => props.navigation.navigate("Scanner")}
              activeOpacity={0.7}
            >
              <Text style={styles.textButton}>Scann Iten</Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.boxTextInput}
          >
            <View
              style={styles.itensBoxTextInput}
            >
              <TextInput
                style={styles.input}
                placeholder="Código"
                onChangeText={(text) => setItemCod(text)}
                value={ItemCod}
                keyboardType={"numeric"}
              />
              <TouchableOpacity
                style={{bottom:13, right:0, position:'absolute' }}
                onPress={() => {
                  dispatch({ type: "SHOW_MODAL_ADDITEM_ON" });
                  setItemCodAux(ItemCod)
                  setItemCod('')
                }}
                activeOpacity={0.8}

              >
                <Icon
                  name="plus-square"
                  size={48}
                  color={commonStyles.color.itensPrincipal}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerView: {
    flex: 1,
    backgroundColor: commonStyles.color.itensPrincipal,
    alignItems: "center",
    justifyContent: "center",
  },
  itemList: {
    flex: 8,
    padding: 5,
  },
  text: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: 25,
    color: commonStyles.color.secondary,
    borderBottomWidth: 2,
    borderBottomColor: "#FFF",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonGoBack: {
    position: "absolute",
    left: 30,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpenScanner: {
    position: "absolute",
    right: 30,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 80,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonStyles.color.principal,
  },
  addButtonCenter: {
    position: "absolute",
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonStyles.color.itensPrincipal,
  },
  textButton: {
    fontSize: 20,
    fontWeight: commonStyles.fontWeight,
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.secondary,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    paddingHorizontal:5,
    height: 43,
    marginTop: 10,
    margin: 15,
    width: "100%",
    borderWidth: 2,
    borderColor: commonStyles.color.itensPrincipal,
    borderRadius: 6,
    borderBottomRightRadius:8,
    borderTopRightRadius:8,
    backgroundColor: "#f1f0f4",
  },
  boxTextInput: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: 'transparent',
  },
  itensBoxTextInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    paddingLeft: 20,
    backgroundColor: "transparent",
  },
});
