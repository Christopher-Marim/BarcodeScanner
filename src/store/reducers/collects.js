

const inicialState = {
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

var id= 2
var idItem = 1


const reducer = (state = inicialState, action) => {

    switch(action.type) {
        case 'ADD_COLLECT':

        const collect ={
            id: id++,
            nome: action.payload[0],
            dateAt: action.payload[1],
            itens:[]
        }
            return {
                ...state, 
                collects: [...state.collects, collect]}
        case 'DEL_COLLECT':
            let indexCollectToRemove = state.collects.findIndex(x => x.id == action.payload[0]);
      
            state.collects.splice(indexCollectToRemove, 1);
            return { ...state, collects: [...state.collects] };
            
            case 'EDIT_COLLECT':
                

            return {
        ...state,
        collects: [...state.collects.map((item, index )=>{
                if (item.id === action.payload[0]) {
                    return {
                        ...item,
                        nome: action.payload[1]
                    }
                }
                return item
            }) ]
        }

        case 'CURRENT_ID':
            return{
                ...state,
                currentID: action.payload[0]
            }
            case 'ADD_ITEM':
                if (state.collects[state.currentID].itens.find(element => element.cod != action.payload[2]) != undefined){ 

                    let item ={
                        id:idItem ++,
                        nome:action.payload[1],
                        cod: action.payload[2],
                        qtd: action.payload[3]
                    }
                    let auxCollects = [...state.collects]
                    auxCollects[state.currentID].itens.push(item)
                    return{
                        ...state,
                        collects: [...auxCollects]
                    }
                }
                else {
                    return{
                        ...state,
                        collects: [state.collects[action.payload[0]].itens.map((item, index)=>{
                            if (item.cod === action.payload[2]) {
                                return {
                                    ...item,
                                    qtd: (item.qtd +1)
                                }
                            }
                            return item

                        })]
                    }

                }
            
        default: 
        return state                   
    }
}

export default reducer;