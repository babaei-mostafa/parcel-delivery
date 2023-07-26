import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  input: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius,
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        boxShadow: `${theme.palette.primary.main} 0 0 0 0.2rem`,
      },
    },
  },
}))
