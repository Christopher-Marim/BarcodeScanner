const inicialState = {
  showModalADDCOLLECT: false,
  showModalADDITEM: false,
  showModalEDT: false,
};

const reducer = (state = inicialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL_ADDCOLLECT_ON':
      return {
        ...state,
        showModalADDCOLLECT: true,
      };
    case 'SHOW_MODAL_ADDCOLLECT_OFF':
      return {
        ...state,
        showModalADDCOLLECT: false,
      };
    case 'SHOW_MODAL_EDT_ON':
      return {
        ...state,
        showModalEDT: true,
      };
    case 'SHOW_MODAL_EDT_OFF':
      return {
        ...state,
        showModalEDT: false,
      };
      case 'SHOW_MODAL_ADDITEM_ON':
        return {
          ...state,
          showModalADDITEM: true,
        };
      case 'SHOW_MODAL_ADDITEM_OFF':
        return {
          ...state,
          showModalADDITEM: false,
        };

    default:
      return state;
  }
};

export default reducer;
