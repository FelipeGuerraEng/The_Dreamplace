import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && {
      label: currentUser.userName,
      href: '/user/user',
    },
    currentUser && {
      label: 'Create Dreamtickets',
      href: '/dreamtickets/new',
    },
    currentUser && { label: 'My Fundings', href: '/fundings' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link href={!currentUser ? '/auth/signup' : '/'}>
        <a className="navbar-brand" style={{ marginLeft: 30 + 'px' }}>
          The Dream Place
        </a>
      </Link>
      <div
        className="d-flex justify-content-end"
        style={{ marginRight: 30 + 'px' }}
      >
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
