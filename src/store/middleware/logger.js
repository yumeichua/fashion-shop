export const loggerMiddleWare = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log("ACTION.type:", action.type);
    console.log("ACTION.payload", action.payload);
    console.log("ACTION.state_before", store.getState());

    next(action);

    console.log("ACTION.state_after", store.getState());
};