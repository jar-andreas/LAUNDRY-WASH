import { Outlet } from 'react-router'
import Nav from '../components/Nav'


export default function RootLayout() {
  return (
    <>
    <Nav/>
    <Outlet/>
    </>
  )
}
