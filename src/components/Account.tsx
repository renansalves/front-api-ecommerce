import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
export const Account = (props: {}) => {
  return (
    <>
      <Link
        to="/conta"
        className="group flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
        aria-label="Minha conta"
      >
        <UserCircleIcon className="h-7 w-7 text-gray-700 group-hover:text-gray-900" />
        <span className="hidden text-sm text-gray-700 sm:inline">Minha Conta</span>
      </Link>
    </>
  )
}
