import { CityListState } from '../store/slices';

export function checkDuplicates(array: CityListState[], value: string) {
  return array.some(el => el.name.toLowerCase() === value.toLowerCase());
}
