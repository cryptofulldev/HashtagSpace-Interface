import { toast } from 'react-toastify'
import { errorsM } from '../restReq'

interface ErrorProps {
  code: number
  data: {
    mnemonic: string
    description: string
    fields: string[]
    location: string[]
  }
  message: string
}

export default (error: ErrorProps | undefined, method: string, showError = true): void => {
  const erMessage = error?.code ? errorsM.get(error?.code) : undefined

  if (error?.code === undefined) {
    toast.error('Unknown Error')
    return
  }
  if (!showError) return
  if (error?.code === 610 && error.data.description) {
    toast.error(error.data.description)
    return
  }

  if (typeof erMessage === 'string') {
    toast.error(erMessage)
    return
  }
  toast.error(`Something went wrong`)
}
