// only get message of error, avoid passing a non-serializable in action
export const getError = (error) =>
    error.response && error.response.data.message ? error.response.data.message : error.response;
