const initState = {
  isAuthed: false,
  groupChosen: false,
  formSuccess: false,
  formFailed: false,
  groups: {},
  transactions: {},
  myGroup: null,
  loaded: false,
};

const myReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      //console.log("Login success");
      return {
        ...state,
        isAuthed: true,
        formSuccess: true,
        myGroup: action.myGroup,
      };

    case "LOGIN_ERROR":
      //console.log("Login error");
      //console.log(action.err.message);
      return {
        ...state,
        formFailed: true,
      };

    case "SIGNOUT_SUCCESS":
      //console.log("Signout success");
      return {
        ...state,
        isAuthed: false,
        myGroup: null,
      };

    case "GROUP_CHOSEN":
      //console.log("Group chosen");
      return {
        ...state,
        groupChosen: true,
        formSuccess: true,
        myGroup: action.myGroup,
      };

    case "FETCHED_GROUPS":
      //console.log("Fetched groups");

      return {
        ...state,
        groups: action.groups,
        loaded: true,
      };

    case "FETCHED_TRANSACTIONS":
      //console.log("Fetched transactions");

      return {
        ...state,
        transactions: action.transactions,
      };

    case "RESET_FORM":
      //console.log("Form reset");
      return {
        ...state,
        formSuccess: false,
        formFailed: false,
      };

    case "ADD_POINTS":
      //console.log("Add points successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "ATTACKER_CHOSEN":
      //console.log("Attacker chosen successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "CHOOSE_ATTACKER_ERROR":
      //console.log("Choosing attacker error");
      //console.log(action.err.message);
      return {
        ...state,
        formFailed: true,
      };

    case "TRANSFER_POINTS":
      //console.log("Transfer points successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "CONFIRM_FORM_OPEN":
      //console.log("Open confirm form successfully");
      return {
        ...state,
        confirmForm: true,
      };

    case "CONFIRMFORM_CONFIRM":
      //console.log("Confirm form confirm executing callback successfully");
      return {
        ...state,
        confirm: true,
      };

    case "CONFIRM_FORM_CLOSE":
      //console.log("Close confirm form successfully");
      return {
        ...state,
        confirm: false,
        confirmForm: false,
        clearAction: true,
      };

    case "CONFIRM_FORM_CLEARED_CALLBACKACTION":
      //console.log("Callback action in admin menu clear successfully");
      return {
        ...state,
        clearAction: false,
      };

    default:
      return state;
  }
};

export default myReducer;
