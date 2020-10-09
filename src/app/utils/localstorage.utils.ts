export const setLocalStorage = (nameKey, data) => localStorage.setItem(nameKey, data)
  
export const getLocalStorage = nameKey => localStorage.getItem(nameKey)
  
export const removeLocalStorage = nameKey => localStorage.removeItem(nameKey)