import { LinearProgress } from '@material-ui/core'
import './Loading.scss'

const Loading = () => {
  return (
    <div className='loading'>
      <h1 className="loading__title">Carregando...</h1>
      <LinearProgress color="warning" />
    </div>
  )
}

export default Loading
