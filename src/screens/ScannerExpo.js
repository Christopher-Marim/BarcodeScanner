import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useDispatch } from "react-redux";

import AddItem from "./AddItem";

export default function App(props) {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeCodes, setBarcode] = useState('')



  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function onBarCodeRead(scanResult) {
    console.warn(scanResult.data);
   setScanned(true)
    if (scanResult.data != null) {
    setBarcode(scanResult.data)
     
        dispatch({type:'SHOW_MODAL_ADDITEM_ON'})
  
    }
    else{
      Alert.alert( 'Scann não reconhecido', 'Barcode não reconhecido')

    }
    return;
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <AddItem cod={barcodeCodes} navigation={props.navigation} />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : onBarCodeRead}
        style={StyleSheet.absoluteFillObject}
        
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
