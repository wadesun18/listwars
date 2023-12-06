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

import {List} from '../../types/data';
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
    SetStateAction<{
      listName: string;
      tasks: {
        id: string;
        title: string;
        details: string;
        whodunnit: string;
        status: string;
      }[];
    }>
  >;
  getListItems: () => void;
  listCleared: boolean;
  setListCleared: Dispatch<SetStateAction<boolean>>;
  checkListCleared: (arr: List) => void;
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
  listCleared: false,
  setListCleared: () => {},
  checkListCleared: () => {},
});

export function MyListProvider({children}: {children: React.ReactNode}) {
  const [listItems, setListItems] = useState<ListContent['listItems']>();
  const [listCleared, setListCleared] = useState(false);

  const [errorMessage, setErrorMessage] = useState<unknown>(null);

  const getListItems = useCallback(() => {
    // fetch data
    setListItems(Data);
  }, []);

  const checkListCleared = useCallback((arr: List | undefined) => {
    if (arr?.tasks.every(v => v.status === 'complete')) {
      setListCleared(true);
    }
  }, []);

  const state = useMemo(
    () => ({
      listItems,
      setListItems,
      getListItems,
      errorMessage,
      setErrorMessage,
      listCleared,
      setListCleared,
      checkListCleared,
    }),
    [
      listItems,
      setListItems,
      errorMessage,
      getListItems,
      listCleared,
      checkListCleared,
    ],
  );

  return (
    <MyListContext.Provider value={state}>{children}</MyListContext.Provider>
  );
}

export const useListContext = () => useContext(MyListContext);
