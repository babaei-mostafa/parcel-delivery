import { makeStyles } from '@material-ui/core'

export default makeStyles({
  gridRow: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: 'lightblue',
      '& .gridColumn': {
        color: 'purple',
      },
    },
  },
  gridColumn: {
    transition: 'color 0.3s',
  },
})
