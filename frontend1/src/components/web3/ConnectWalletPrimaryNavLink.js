import React from "react";
import tw from "twin.macro";

const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 lg:mr-12 last:mr-0 text-gray-700 border-gray-400 hocus:border-gray-700 `;
const PrimaryNavLink = tw(
  NavLink
)`text-gray-100 bg-primary-500 px-6 py-3 border-none rounded hocus:bg-primary-900 focus:shadow-outline`;

export function ConnectWalletPrimaryNavLink({ connectWallet }) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
               
        <PrimaryNavLink onClick={connectWallet}>
          Connect Wallet
        </PrimaryNavLink>
      </div>
    </div>
  );
}
