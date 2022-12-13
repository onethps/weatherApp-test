import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

//TODO:FIX ANY
export const useSuggestPlacesData = (setOptions: (val: any) => void) => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const fetchPlacesOptions = useCallback(async (searchQuery: string) => {
  //   if (searchQuery.length < 3) {
  //     return;
  //   }
  //   setLoading(true);
  //   const res = await placesAPI.getSuggestPlaces(searchQuery);
  //   setOptions(res.data.data);
  //   setLoading(false);
  // }, []);
  // const debounceFn = useCallback(_.debounce(fetchPlacesOptions, 1000), []);
  // useEffect(() => {
  //   return debounceFn.cancel();
  // }, []);
  // return { loading, debounceFn };
};
