import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logoIgnite from '../../assets/logo-ignite.svg'
import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} />
      <nav>
        <NavLink to={'/'}>
          <Timer size={40} />
        </NavLink>
        <NavLink to={'/history'}>
          <Scroll size={40} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
