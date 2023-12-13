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

import {List, Task} from '../../types/data';
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
  listClickComplete: (i: string) => void;
  listWinner: (arr: List) => void;
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
  listClickComplete: () => {},
  listWinner: () => {},
});

export function MyListProvider({children}: {children: React.ReactNode}) {
  const [listItems, setListItems] = useState<ListContent['listItems']>();
  const [listCleared, setListCleared] = useState(false);

  const [errorMessage, setErrorMessage] = useState<unknown>(null);

  const tempData = {...Data};

  const getListItems = useCallback(() => {
    setListItems(tempData);
  }, []);

  const listClickComplete = useCallback(
    async (i: string) => {
      const modifiedData = {...tempData};
      const index = modifiedData.tasks.findIndex((element: Task) => {
        return element.id === i;
      });
      modifiedData.tasks[index].status = 'complete';
      await new Promise(resolve => setTimeout(resolve, 400));
      setListItems(modifiedData);
    },
    [getListItems],
  );

  const checkListCleared = useCallback((arr: List | undefined) => {
    if (arr?.tasks.every(v => v.status === 'complete')) {
      setListCleared(true);
    }
  }, []);

  const listWinner = useCallback((arr: List | undefined) => {
    let winnerAnnouncement = '';

    if (arr) {
      const playerScores = arr?.tasks.reduce(
        (a, {whodunnit}) =>
          Object.assign(a, {[whodunnit]: (a[whodunnit] || 0) + 1}),
        {},
      );

      const max = Object.keys(playerScores).reduce(
        (a, v) => Math.max(a, playerScores[v]),
        -Infinity,
      );
      const winner = Object.keys(playerScores).filter(
        v => playerScores[v] === max,
      );

      console.log('winner', winner);
      console.log('length', winner.length);

      if (winner.length > 1) {
        winnerAnnouncement = "It's a tie! Good job to all the competitors";
      } else if (winner.length === 1) {
        winnerAnnouncement = `${winner} wins! Way to go!`;
      }

      return winnerAnnouncement;
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
      listClickComplete,
      listWinner,
    }),
    [
      listItems,
      setListItems,
      errorMessage,
      getListItems,
      listCleared,
      checkListCleared,
      listClickComplete,
      listWinner,
    ],
  );

  return (
    <MyListContext.Provider value={state}>{children}</MyListContext.Provider>
  );
}

export const useListContext = () => useContext(MyListContext);
