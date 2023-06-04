// Nav.js
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className='nav'>
      <Link className='nav-link' to='/stake'>Stake</Link>
      <Link className='nav-link' to='/propose'>Propose Price</Link>
      <Link className='nav-link' to='/getprice'>Get Price</Link>
    </nav>
  );
}

export default Nav;
