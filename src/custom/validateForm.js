export const validatedForm = (jsonFetchResponse, errors, setErrors) => {
  let listErrors = jsonFetchResponse.data[0];
  
  Object.entries(listErrors).forEach(([key, value]) => {
    if(key.indexOf("documents") != -1) {
      setErrors((prev) => {
        return {...prev, "documents" : "Solo se aceptan archivos pdf"};
      })
    }

    if(key.indexOf("images") != -1) {
      setErrors((prev) => {
        return {...prev, "images" : "Solo se aceptan archivos tipo imagen"};
      })
    }

    if (errors[key] != undefined) {
      setErrors((prev) => {
        return {...prev, [key] : value[0]};
      })
    }
  });
};
