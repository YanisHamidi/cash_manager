import { MouseEventHandler } from 'react';
import { NavElement } from './entities';
import { Location } from 'react-router-dom';

type Properties = Readonly<{
  handleNavButtonClick: MouseEventHandler<HTMLButtonElement>;
  location: Location<string>;
}>;

const Nav = ({ handleNavButtonClick, location }: Properties) => {
  const navElements: readonly NavElement[] = [
    { name: 'Dashboard', value: '/dashboard' },
    { name: 'Events', value: '/events' },
    { name: 'Registration', value: '/registration' },
    { name: 'Settings', value: '/settings' },
  ];
  return (
    <ul className="flex w-full items-center justify-center">
      {navElements.map((element) => (
        <li className="px-2">
          <button
            className={
              location.pathname === element.value ? 'navItemSelect' : 'navItem'
            }
            value={element.value}
            onClick={handleNavButtonClick}
          >
            {element.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
