import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./AddCollect";

import commonStyles from "../commonStyles";
import Collect from "../components/Collect";
import EditCollect from "../screens/EditCollect";

export default function CollectList({ navigation }) {
  const collects = useSelector((state) => state.collects.collects);
  const refresh = useSelector((state) => state.collects.refresh);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <Modal></Modal>
      <EditCollect></EditCollect>
      <View style={styles.headerView}>
        <Text style={styles.Text}>BarcodeScanner</Text>
      </View>
      {collects.length > 0 && (
        <View style={{ flex: 9 }}>
          <View style={styles.collectList}>
            <FlatList
              data={collects}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <View style={{ padding: 3 }}>
                  <Collect {...item} navigation={navigation}></Collect>
                </View>
              )}
              refreshControl={<RefreshControl refreshing={refresh} />}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch({ type: "SHOW_MODAL_ADDCOLLECT_ON" })}
            activeOpacity={0.7}
          >
            <Icon name="plus" size={20} color={commonStyles.color.secondary} />
          </TouchableOpacity>
        </View>
      )}
      {collects.length == 0 && (
        <View
          style={{ flex: 9, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={styles.addButtonCenter}
            onPress={() => dispatch({ type: "SHOW_MODAL_ADDCOLLECT_ON" })}
            activeOpacity={0.7}
          >
            <Text style={styles.Text}>Nova Coleta</Text>
          </TouchableOpacity>
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
    backgroundColor: commonStyles.color.principal,
    alignItems: "center",
    justifyContent: "center",
  },
  collectList: {
    padding: 5,
  },
  Text: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 25,
    color: "white",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
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
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonStyles.color.principal,
  },
});
