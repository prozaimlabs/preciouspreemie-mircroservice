import React, { useState } from 'react';
import Wrapper from './Wrapper';
import Link from 'next/link';
import Menu from './Menu';

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [show, setShow] = useState('translate-y-0');
    const [lastScrollY, setLastScollY] = useState(0);

    return (
        <header
            className={`w-full h-[50px] md:h-[80px] bg-white flex 
                        items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}
                            `}
        >
            <Wrapper>
                <Link href={'/'}>
                    <img src="/logo1.png" className="w-[40px] md:w-[60px]" />
                </Link>

                <Menu
                    showCategoryMenu={showCategoryMenu}
                    setShowCategoryMenu={setShowCategoryMenu}
                />
            </Wrapper>
        </header>
    );
};

export default Header;
