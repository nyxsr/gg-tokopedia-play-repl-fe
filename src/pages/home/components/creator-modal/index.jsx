import {motion} from 'framer-motion'
import AddVideo from './components/AddVideo'
import EditVideo from './components/EditVideo'
import DeleteVideo from './components/DeleteVideo'

function index({modalCreator, setModalCreator}) {
  return (
    <motion.div
      onClick={() => setModalCreator({is:false})}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen flex items-center justify-center h-screen bg-white/50 z-20"
    >
        {modalCreator.type === 'add' && <AddVideo setModalCreator={setModalCreator}/>}
        {modalCreator.type === 'edit' && <EditVideo setModalCreator={setModalCreator}/>}
        {modalCreator.type === 'delete' && <DeleteVideo setModalCreator={setModalCreator}/>}
    </motion.div>
  )
}

export default index