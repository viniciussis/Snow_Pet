export default interface IPetColumn {
  id:
    | 'name'
    | 'owner'
    | 'specie'
    | 'breed'
    | 'size'
    | 'gender'
    | 'healthProblems'
    | 'allergies'
    | 'additionalInfo'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: string) => string
}
