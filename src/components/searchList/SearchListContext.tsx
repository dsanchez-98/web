import React, { createContext, FC, useContext } from 'react'

interface ContextType {}

const initialValues: ContextType = {}

export const Context = createContext<ContextType>(initialValues)

export const useSearchListcontext = () => useContext(Context)

export const SearchListContext: FC<{}> = (props) => {
  return <Context.Provider value={{}}>{props.children}</Context.Provider>
}

export default SearchListContext
