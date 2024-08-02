/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import { Menu, X } from 'react-feather';
import { Link } from 'react-router-dom';

interface HeaderItem {
  title: string;
  link: string;
}

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const header: HeaderItem[] = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/' },
    { title: 'Review', link: '/' },
  ];

  return (
    <header className="border-b ">
      <div className="container mx-auto w-full flex gap-6 justify-between p-2">
        <img
          width={40}
          src="https://media.licdn.com/dms/image/D560BAQE5PCYCIJ4a9A/company-logo_200_200/0/1721995789462/helpstir_india_logo?e=2147483647&v=beta&t=wetGemEuIs8zIX2u_0_D8cYodhTaRYWnlZ1b0QSDmNc"
          alt=""
          className="animate-bounce rounded-full"
        />
        <div className="hidden lg:flex gap-7 text-md  text-white">
          {header.map((item, index) => (
            <ul key={index} className="flex justify-center">
              <Link
                to={item.link}
                className="hover:scale-125 duration-300 py-1 hover:text-orange-400"
              >
                <li>{item.title}</li>
              </Link>
            </ul>
          ))}
        </div>
        <div className="flex  justify-center items-center font-extrabold gap-2">
          <button
            type="button"
            className="md:hidden flex justify-end"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <X className="hover:scale-125 duration-300" />
            ) : (
              <Menu className="hover:scale-125 duration-300" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="container mx-auto md:hidden bg-zinc-200 p-4">
          {header.map((item, index) => (
            <ul key={index} className="flex flex-col">
              <li className="py-1">{item.title}</li>
            </ul>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
