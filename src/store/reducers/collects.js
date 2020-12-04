
import { Alert } from "react-native";

const inicialState = {
  idCollect: 0,
  idItem: 0,
  refresh: null,
  currentID: null,
  currentIDitem: null,
  AddItem: true,
  collects: [],
};

const reducer = (state = inicialState, action) => {
  switch (action.type) {
    case "ADD_COLLECT":

      const collect = {
        id: state.idCollect,
        nome: action.payload[0],
        dateAt: action.payload[1],
        itens: [],
      };
      state.idCollect++
      return {
        ...state,
        collects: [...state.collects, collect],
      };
    case "DEL_COLLECT":
      let indexCollectToRemove = state.collects.findIndex(
        (x) => x.id == action.payload[0]
      );
      state.collects.splice(indexCollectToRemove, 1);
      return { ...state, collects: [...state.collects] };

    case "EDIT_COLLECT":
      return {
        ...state,
        collects: [
          ...state.collects.map((item, index) => {
            if (index === action.payload[0]) {
              return {
                ...item,
                nome: action.payload[1],
              };
            }
            return item;
          }),
        ],
      };

    case "CURRENT_ID":
      let collectIndex = state.collects.findIndex(
        (x) => x.id == action.payload[0]
      );

      return {
        ...state,
        currentID: collectIndex,
      };
    case "CURRENT_ID_ITEM":
      let itemIndex = state.collects[state.currentID].itens.findIndex(
        (x) => x.id == action.payload[0]
      );

      return {
        ...state,
        currentIDitem: itemIndex,
      };
    case "ADD_ITEM":
      if ( state.collects[state.currentID].itens.find(
          (element) => element.cod === action.payload[2]) == undefined) {
        console.log("ID item>", state.idItem);
        console.log("Current ID ITEM>", state.currentIDitem);
        console.log("Current ID>", state.currentID);

        const item = {
          id: state.idItem,
          nome: action.payload[1],
          cod: action.payload[2],
          qtd: action.payload[3],
        };
        let auxCollects = [...state.collects];
        auxCollects[state.currentID].itens.push(item)

        state.idItem++
        return {
          ...state,
          collects: [...auxCollects] 
        };
      } else {
        Alert.alert(
          "Item já Existente",
          "Deseja somar a quantidade de produtos ou gerar outro item",
          [
            {
              text: "Cancelar",
              onPress: () => console.log("Operação Cancelada"),
              style: "cancel",
            },

            //{
            //  text: "AddItem",
            //  onPress: function() {

            //     const item = {
            //       id: state.idItem++,
            //       nome: action.payload[1],
            //      cod: action.payload[2],
            //       qtd: action.payload[3],
            //      };
            //     let auxCollects = [...state.collects];
            //       auxCollects[state.currentID].itens.push(item);
            //       console.log('ID item>', {...state})
            //       console.log('Current ID ITEM>', state.currentIDitem)
            //       console.log('Current ID>', state.currentID)
            //       return {
            //        ...state,
            //        idItem: state.idItem,
            //        collects: [...auxCollects],

            //       };

            //      },
            //   },
            {
              text: "Somar",
              onPress: () =>{
                state.collects[state.currentID].itens.find(
                  (element) => element.cod == action.payload[2]
                ).qtd += action.payload[3];
              },
            },
          ],
          { cancelable: false }
        );
      }

      

    case "REFRESH":
      return {
        ...state,
        refresh: action.payload[0],
      };
      case "DEL_ITEM":
        let indexItemToRemove = state.collects[state.currentID].itens.findIndex(
          (x) => x.id == action.payload[0]
        );
       let delItem = state.collects[state.currentID].itens.splice(indexItemToRemove, 1);
        return { ...state,  ...state.collects[state.currentID], itens: [...delItem] };
    case "EDT_ITEM":
     state.collects[state.currentID].itens[state.currentIDitem].qtd = parseInt(action.payload, 10) ;
      return { ...state, collects: [...state.collects] };

    default:
      return state;
  }
};

export default reducer;
