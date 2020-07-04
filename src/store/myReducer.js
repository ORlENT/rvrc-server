const initState = {
  isAuthed: false,
  formSuccess: false,
  formFailed: false,
  groups: {},
  loaded: false,
};

const myReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Login success");
      return {
        ...state,
        isAuthed: true,
      };

    case "LOGIN_ERROR":
      console.log("Login error");
      console.log(action.err.message);
      return {
        ...state,
        formFailed: true,
      };

    case "SIGNOUT_SUCCESS":
      console.log("Signout success");
      return {
        ...state,
        isAuthed: false,
      };

    case "FETCH_SUCCESS":
      console.log("Fetch success");
      return {
        ...state,
        groups: action.groups,
        loaded: true,
      };

    case "RESET_FORM":
      console.log("Form reset");
      return {
        ...state,
        formSuccess: false,
        formFailed: false,
      };

    case "ADD_POINTS":
      console.log("Add points successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "TRANSFER_POINTS":
      console.log("Transfer points successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "CONFIRM_FORM_OPEN":
      console.log("Open confirm form successfully");
      return {
        ...state,
        confirmForm: true,
      };

    case "CONFIRMFORM_CONFIRM":
      console.log("Confirm form confirm executing callback successfully");
      return {
        ...state,
        confirm: true,
      };

    case "CONFIRM_FORM_CLOSE":
      console.log("Close confirm form successfully");
      return {
        ...state,
        confirm: false,
        confirmForm: false,
        clearAction: true,
      };

    case "CONFIRM_FORM_CLEARED_CALLBACKACTION":
      console.log("Callback action in admin menu clear successfully");
      return {
        ...state,
        clearAction: false,
      };

    default:
      return state;
  }
};

export default myReducer;
