import Link from 'next/link'
import { getSession } from '@/lib/session'
import { logout } from '@/lib/actions/auth'
import NavClient from './NavClient'

export default async function Nav() {
  const session = await getSession()
  return <NavClient session={session} logoutAction={logout} />
}
