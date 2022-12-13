import { Autocomplete, Box, Button, CircularProgress, TextField } from '@mui/material';
import React, { FC } from 'react';

import { useSuggestPlacesData } from '../../hooks/useSuggestPlacesData';
import { addNewLocation } from '../../store/middleware/cities';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface SearchAutoCompleteProps {
  coord: { lat: number; lng: number } | null;
  setCoord: (val: { lat: number; lng: number } | null) => void;
}

export const SearchAutoComplete: FC<SearchAutoCompleteProps> = ({ coord, setCoord }) => {
  return <div>Search</div>;
};
//   const [query, setQuery] = React.useState<string>('');
//   const [options, setOptions] = React.useState<any>([]);

//   const dispatch = useAppDispatch();

//   //TODO: fix any types

//   const { loading, debounceFn } = useSuggestPlacesData(setOptions);

//   const onChangeQueryHandle = (newInputValue: any, target: any) => {
//     setQuery(newInputValue);
//     if (target !== Number(target)) debounceFn(target);
//     if (options.length) {
//       setCoord({ lat: options[0].latitude, lng: options[0].longitude });
//     }
//   };

//   const addLocationHandle = () => {
//     if (!coord) {
//       return;
//     }

//     dispatch(addNewLocation({ lat: coord.lat, lng: coord.lng }));
//     setOptions([]);
//     setQuery('');
//     setCoord(null);
//   };

//   return (
//     <Box sx={{ display: 'flex', gap: 3 }}>
//       <Autocomplete
//         data-testid={'search-autocomplete'}
//         freeSolo
//         inputValue={query}
//         onInputChange={(e: any, newInputValue) =>
//           onChangeQueryHandle(newInputValue, e.target.value)
//         }
//         id="search-location"
//         options={options}
//         inputMode={'search'}
//         isOptionEqualToValue={(option: any, value: any) => option.city === value.city}
//         filterOptions={x => x}
//         filterSelectedOptions
//         getOptionLabel={option => option.city}
//         style={{ width: 300 }}
//         renderInput={params => (
//           <TextField
//             {...params}
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: (
//                 <React.Fragment>
//                   {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                   {params.InputProps.endAdornment}
//                 </React.Fragment>
//               ),
//             }}
//             label="Add location..."
//             variant="outlined"
//           />
//         )}
//       />

//       <Button
//         type="button"
//         data-testid="add-new-city"
//         disabled={loading}
//         onClick={addLocationHandle}
//         variant="contained"
//       >
//         Add Location
//       </Button>
//     </Box>
//   );
// };
