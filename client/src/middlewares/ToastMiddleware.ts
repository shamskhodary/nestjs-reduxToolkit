import { toast } from 'react-toastify'
import { logUser, removeUser, signUser } from '../slices/authenticationSlice'

const ToastMiddleware = () => (next:Function) => (action:any) => {
  switch (action.type) {
    case logUser.type:
      toast.success(action.payload.message)
      break

    case signUser.type:
      toast.success(action.payload.message)
      break

    case removeUser.type:
      toast.success(action.payload.message)
      break

    default:
      break
  }
  return next(action)
}

export default ToastMiddleware
