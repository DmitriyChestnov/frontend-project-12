import filter from 'leo-profanity';
import { useCallback } from 'react';

import { WordFilterContext } from './index';

const WordFilterProvider = ({ children }) => {
  filter.add(filter.getDictionary('ru'));

  const filterProfanity = useCallback((word) => filter.clean(word), []);

  return (
    <WordFilterContext.Provider value={filterProfanity}>
      {children}
    </WordFilterContext.Provider>
  );
};

export default WordFilterProvider;
