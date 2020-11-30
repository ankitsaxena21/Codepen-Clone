import { useEffect, useState } from 'react'

// prefix that we will add for each key in local storage
const PREFIX = 'codepen-clone-'

export default function useLocalStorage(key, initialValue) {
  // key for local storage
  const prefixedKey = PREFIX + key

  const [value, setValue] = useState(() => {
    // getting value from localstorage
    const jsonValue = localStorage.getItem(prefixedKey)
    // return a value only if it is stored in local storage
    if (jsonValue != null) return JSON.parse(jsonValue)
    // if a function is passed as an argument
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  // useEffect to handle change in value of either key or value
  useEffect(() => {
    // update the value in local storage
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
