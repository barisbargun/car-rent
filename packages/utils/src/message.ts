export const validationMsg = (
  type: 'min' | 'max',
  characters: number,
  isNumber: boolean = false,
) => `Must be at ${type == 'min' ? 'least' : 'most'} ${characters}${isNumber ? '' : ' characters'}.`
