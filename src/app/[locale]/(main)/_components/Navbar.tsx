'use client';

import { ShoppingCart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCartStore } from '@/../store/useCartStore';
import Button from '@/app/components/common/Button';
import { LanguageSwitcher } from '../../dashboard/_components/LanguageSwitcher';
import CartModal from './CartModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const pathname = usePathname();
  const cart = useCartStore(state => state.cart);
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const tNavlinks = useTranslations('nav');
  const locale = useLocale();
  const navLinks = [
    { name: tNavlinks('home'), href: '/' },
    { name: tNavlinks('products'), href: `/${locale}/products` },
    { name: tNavlinks('about'), href: `/${locale}/about-us` },
    { name: tNavlinks('contact'), href: `/${locale}/contact` },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-[#FAFAFA] shadow-xs backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-360 items-center justify-between px-4 md:px-8">
          <div className="flex shrink-0 items-center">
            <Link href="/">
              <div className="relative h-14 w-14 cursor-pointer">
                <Image
                  src="/assets/images/login-logo.png"
                  alt="Logo"
                  fill
                  sizes="80px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
          <nav className="hidden items-center space-x-10 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[14px] transition-colors duration-200 hover:text-[#00496E] ${
                    isActive ? 'text-[#00496E]' : 'text-[#464646]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-6">
            <button
              type="button"
              aria-label={tNavlinks('cart')}
              className="relative flex cursor-pointer items-center border-none bg-transparent p-0 outline-none"
              onClick={() => setIsCartModalOpen(true)}
            >
              <ShoppingCart className="h-5 w-5 text-[#000000]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 scale-110 items-center justify-center rounded-full bg-[#EA3030] text-[8px] font-semibold text-white transition-all">
                  {cartCount}
                </span>
              )}
            </button>
            <LanguageSwitcher />
            <Button
              variant="primary"
              onClick={() => {
                setIsCartModalOpen(true);
              }}
              className="hidden px-4 py-2.5 lg:inline-flex"
            >
              {tNavlinks('requestProduct')}
            </Button>
            <button
              className="flex items-center text-gray-800 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7H20M4 12H20M10 17H20" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`absolute top-full right-0 left-0 z-40 overflow-hidden border-t border-gray-100 transition-all duration-300 ease-in-out lg:hidden ${
            isMobileMenuOpen
              ? 'max-h-125 opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-4 pb-5">
            <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-[#F3F7F9] text-[#00496E]'
                          : 'text-[#464646] hover:bg-gray-50'
                      }`}
                    >
                      {link.name}

                      {isActive && (
                        <div className="h-2 w-2 rounded-full bg-[#00496E]" />
                      )}
                    </Link>
                  );
                })}
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  setIsCartModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                {tNavlinks('requestProduct')}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
}
