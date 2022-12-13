import { CityListState } from '../store/slices/cities';

export function checkDuplicates(array: CityListState[], value: string) {
  return array.some(el => el.name.toLowerCase() === value.toLowerCase());
}
