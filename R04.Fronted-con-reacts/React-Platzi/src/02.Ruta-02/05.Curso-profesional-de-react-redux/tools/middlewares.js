const logger = (store) => (next) => (action) => {
  next(action);
};

const featuring = (store) => (next) => (actionInfo) => {
  const featured = [{ name: "eddie" }, ...actionInfo.action.payload];
  const updateActionInfo = {
    ...actionInfo,
    action: { ...actionInfo.action, payload: featured },
  };
  next(updateActionInfo);
};

export { logger };
export { featuring };
