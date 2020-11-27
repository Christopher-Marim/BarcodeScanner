

const inicialState = {
    idCollect:2,
    idItem:1,
    refresh:null,
    currentID:null,
    collects: [{
        id: 0,
        nome: "dale",
        dateAt: new Date(),
        itens:[{
            id:0,
            nome: "Item 1",
            cod: 1234,
            qtd:10
        }]
    },
    {
        id: 1,
        nome: "dole",
        dateAt: new Date(),
        itens:[]
    },
]
}

var id = 1
var idItem = 1


const reducer = (state = inicialState, action) => {

    switch(action.type) {
        case 'ADD_COLLECT':

         let addId = state.idCollect++

        const collect ={
            id: addId,
            nome: action.payload[0],
            dateAt: action.payload[1],
            itens:[]
        }
       
            return {
                ...state, 
                id: state.idCollect++,
                collects: [...state.collects, collect]}
        case 'DEL_COLLECT':
            let indexCollectToRemove = state.collects.findIndex(x => x.id == action.payload[0]);
      
          state.collects.splice(indexCollectToRemove, 1);
            return { ...state, collects: [...state.collects] };
            
            case 'EDIT_COLLECT':
                

                return {
                    ...state,
                    collects: [...state.collects.map((item, index )=>{
                            if (index === action.payload[0]) {
                                return {
                                    ...item,
                                    nome: action.payload[1]
                                }
                            }
                            return item
                        }) ]
                    }
            

        case 'CURRENT_ID':
      let collectIndex = state.collects.findIndex(x => x.id == action.payload[0]);

            return{
                ...state,
                currentID: collectIndex
            }
            case 'ADD_ITEM':
                if (state.collects[state.currentID].itens.find(element => element.cod == action.payload[2]) == undefined){ 

                    let item ={
                        id:state.idItem ++,
                        nome:action.payload[1],
                        cod: action.payload[2],
                        qtd: action.payload[3]
                    }
                    let auxCollects = [...state.collects]
                    auxCollects[state.currentID].itens.push(item)
                    return{
                        ...state,
                        idItem: state.idItem++,
                        collects: [...auxCollects]
                    }
                }
                else {
                  let auxItem = [...state.collects[state.currentID].itens]
                  auxItem.find(element => element.cod == action.payload[2]).qtd += action.payload[3]
                  
                    return {...state, ...state.collects, itens: [...auxItem]}

                }
                case 'REFRESH':
            return{
                ...state,
                refresh: action.payload[0]
            }
            
        default: 
        return state                   
    }
}

export default reducer;