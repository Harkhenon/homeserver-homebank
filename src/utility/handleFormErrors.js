/**
 * Handle form errors from the backend
 * returns object with input and their values
 * @return object
 */
export const handleFormErrors = (errorObject) => {
    if(errorObject !== undefined && errorObject !== null) {
        const { status } = errorObject;
        const { message, errors } = errorObject.data;
    
        return {
            message,
            errors,
            status,
        };
    }

    return null;
}