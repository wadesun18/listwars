import React from 'react';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {Data} from '../data/MockData';

export type ListContent = {
  listItems:
    | {
        listName: string;
        tasks: Array<{
          id: string;
          title: string;
          details: string;
          whodunnit: string;
          status: string;
        }>;
      }
    | undefined;
  setListItems: Dispatch<
    SetStateAction<
      | {
          listName: string;
          tasks: {
            id: string;
            title: string;
            details: string;
            whodunnit: string;
            status: string;
          }[];
        }
      | undefined
    >
  >;
  getListItems: () => void;
};

export const MyListContext = createContext<ListContent>({
  listItems: {
    listName: 'none',
    tasks: [
      {
        id: '0',
        title: 'none',
        details: 'none',
        whodunnit: 'none',
        status: 'incomplete',
      },
    ],
  },

  setListItems: () => {},
  getListItems: () => {},
});

export function MyListProvider({children}: {children: React.ReactNode}) {
  const [listItems, setListItems] = useState<ListContent['listItems']>();
  const [errorMessage, setErrorMessage] = useState<unknown>(null);

  const getListItems = useCallback(() => {
    // fetch data
    setListItems(Data);
  }, []);

  const state = useMemo(
    () => ({
      listItems,
      setListItems,
      getListItems,
      errorMessage,
      setErrorMessage,
    }),
    [listItems, setListItems, errorMessage, getListItems],
  );

  return (
    <MyListContext.Provider value={state}>{children}</MyListContext.Provider>
  );
}

export const useListContext = () => useContext(MyListContext);
