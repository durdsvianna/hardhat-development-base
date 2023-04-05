import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Content2Xl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
// eslint-disable-next-line
import { css } from "styled-components/macro"; 
import GitHubButton from "react-github-btn";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { LogoLink } from "components/headers/light.js";
import { SectionHeading as HeadingBase } from "components/misc/Headings";
import { SectionDescription as DescriptionBase } from "components/misc/Typography";
import logo from "images/logo_D.png";
import { motion } from "framer-motion";
import {ReactComponent as SvgDotPatternIcon} from "images/dot-pattern.svg"

// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import TokenArtifact from "./contracts/Token.json";
import TalkawayERC721Artifact from "./contracts/TalkawayERC721.json";
import TalkawayERC1155Artifact from "./contracts/Talkaway1155.json";
import contractAddress from "./contracts/contract-address.json";
import contractErc1155Address from "./contracts/contract-erc1155-address.json";
import contractErc721Address from "./contracts/contract-erc721-address.json";
// All the logic of this dapp is contained in the Dapp component.
// These other components are just presentational ones: they don't have any
// logic. They just render HTML.
import { NoWalletDetected } from "./components/web3/NoWalletDetected";
import { ConnectWalletPrimaryNavLink } from "./components/web3/ConnectWalletPrimaryNavLink";
import { Loading } from "./components/web3/Loading";
import { Transfer } from "./components/web3/Transfer";
import { TransactionErrorMessage } from "./components/web3/TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./components/web3/WaitingForTransactionMessage";
import { NoTokensMessage } from "./components/web3/NoTokensMessage";
import { NetworkErrorMessage } from "./components/web3/NetworkErrorMessage";
import { abreviaChavePublica } from "./middleware/UtilsMiddleware.js"
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";
// This is the Hardhat Network id that we set in our hardhat.config.js.
// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
const HARDHAT_NETWORK_ID = '31337';

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-80 bg-cover bg-center rounded`
]);
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Container = tw.div`relative`;
const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

/* Hero */
const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 lg:mr-12 last:mr-0 text-gray-700 border-gray-400 hocus:border-gray-700 `;
const PrimaryNavLink = tw(
  NavLink
)`text-gray-100 bg-primary-500 px-6 py-3 border-none rounded hocus:bg-primary-900 focus:shadow-outline`;
const HeroRow = tw(Row)`flex-col justify-between items-center px-64 py-8 lg:py-6`;

const Heading = tw(HeadingBase)`text-center text-primary-900 leading-snug`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 ml-2 mt-6`;
const Input = tw.input`w-full`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)(props => [
  `background-image: url("${props.$imageSrc}");`,
  tw`h-4 bg-cover bg-center rounded`
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const AuthorName = tw.h6`font-semibold text-lg`;
const SubmitButton = tw.button`w-full mr-4 mb-8 sm:w-32 mt-32 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

const Features = tw.div`mt-8 max-w-sm mx-auto md:mx-0`;
const Feature = tw.div`mt-8 flex items-start flex-col md:flex-row`;

const FeatureIconContainer = styled.div`
  ${tw`mx-auto inline-block border border-primary-500 text-center rounded-full p-2 flex-shrink-0`}
  svg {
    ${tw`w-5 h-5 text-primary-500`}
  }
`;

const FeatureText = tw.div`mt-4 md:mt-0 md:ml-4 text-center md:text-left`;
const FeatureHeading = tw.div`font-bold text-lg text-primary-500`;
const FeatureDescription = tw.div`mt-16 text-sm`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``
const recentPosts = [
  {
    tutorAddressAbrv: "0x55.....fa9e",
    tutorAddress: "0x553C28796D99B154Da50F3BFA8681f1bdfb8fa9e"
  },
];




export default class DappTemplatePage extends React.Component {

  constructor(props) {
    super(props);

    // We store multiple things in DappTemplatePage's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      // The info of the token (i.e. It's Name and symbol)
      tokenData: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: undefined,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      erc721: undefined,
      erc1155: undefined,
      _tutorButtonLabel: "Buy",
      _caminhadaButtonLabel: "Check-in"
    };

    this.state = this.initialState;
  }



  render() {
    let features = null;
   /*
   * Change the features variable as you like, add or delete objects
   * `icon` must be a React SVG component. See how BriefcaseIcon is imported above. For a full list of available icons, see Feather Icons.
   */
  const defaultFeatures = [
    {
      tutorAddressAbrv: "0x55.....fa9e",
      tutorAddress: "0x553C28796D99B154Da50F3BFA8681f1bdfb8fa9e"
    },
    {
      tutorAddressAbrv: "0x55.....fa9e",
      tutorAddress: "0x553C28796D99B154Da50F3BFA8681f1bdfb8fa9e"
    }
  ];

    if (!features) features = defaultFeatures;

    // Ethereum wallets inject the window.ethereum object. If it hasn't been
    // injected, we instruct the user to install MetaMask.
    if (window.ethereum === undefined) {
      console.log("PERDEU A WALLET")
      return <NoWalletDetected />;
    }

    // The next thing we need to do, is to ask the user to connect their wallet.
    // When the wallet gets connected, we are going to save the users's address
    // in the component's state. So, if it hasn't been saved yet, we have
    // to show the ConnectWallet component.
    //
    // Note that we pass it a callback that is going to be called when the user
    // clicks a button. This callback just calls the _connectWallet method.
    if (!this.state.selectedAddress) {
      return (
        <AnimationRevealPage disabled>
          <Container tw="-mx-8 -mt-8 pt-8 px-8">
            <Content2Xl>
              <NavRow>
                <LogoLink href="/">
                  <img alt="" />
                  talkaway
                </LogoLink>
                <div tw="flex flex-col lg:flex-row items-center">
                  <NavLink href="/">
                    
                  </NavLink>                  
                  <ConnectWalletPrimaryNavLink 
                    connectWallet={() => this._connectWallet()}             
                  />
                </div>
              </NavRow>
              <HeroRow></HeroRow>
              <HeroRow>
                <div className="col-12 mt-12 text-center">
                  {/* Metamask network should be set to Localhost:8545. */}
                  {this.state.networkError && (
                    <NetworkErrorMessage 
                      message={this.state.networkError} 
                      dismiss={() => this._dismissNetworkError()} 
                    />
                  )}
                </div>
              </HeroRow>              
            </Content2Xl>
          </Container> 
        </AnimationRevealPage>
      );
    }

    // If the token data or the user's balance hasn't loaded yet, we show
    // a loading component.
    if (!this.state.tokenData || !this.state.balance) {
      return <Loading />;
    }

    return (
      <AnimationRevealPage disabled>
        <Container tw="-mx-8 -mt-8 pt-8 px-8">
          <Content2Xl>
            <NavRow>
              <LogoLink href="/">
                <img alt="" />
                talkaway
              </LogoLink>
              <div tw="flex flex-col lg:flex-row items-center">
                <NavLink href="/">
                  
                </NavLink>                
                <ConnectWalletPrimaryNavLink 
                  connectWallet={() => this._connectWallet()}             
                />
              </div>
            </NavRow>            
              <div>
                Bem vindo <b>{this.state.selectedAddress}</b>
              </div>            
            <HeroRow tw="w-full">
                  <Content tw="-mt-6 w-full">
                    <FormContainer>                      
                      <div >                      
                        
                          <TwoColumn>
                            <Column tw="w-full">
                              <RecentPostsContainer>
                                <Heading tw="justify-between w-full pl-12">Caminhadas</Heading>                                
                                <Features tw="justify-between w-full pl-12">
                                  {features.map((feature, index) => (
                                    <Feature key={index}>
                                      <FeatureIconContainer tw="w-full pl-16">{<feature.Icon />}</FeatureIconContainer>
                                      <FeatureText>
                                      <InputContainer tw="w-full justify-start flex mt-4 mr-5 pr-32" >
                                        <SubmitButton onClick={() => this._handleCheckinButton()} >{this._caminhadaButtonLabel}</SubmitButton>
                                        <FeatureDescription tw="w-full" >{feature.tutorAddressAbrv}</FeatureDescription>
                                      </InputContainer>
                                        
                                      </FeatureText>
                                    </Feature>
                                  ))}
                                </Features>                         
                              </RecentPostsContainer>
                            </Column>
                            <Column tw="w-full">
                              <RecentPostsContainer>
                                <Heading tw="ml-32">Tutores disponíveis</Heading>
                                <PostsContainer>
                                  {recentPosts.map((post, index) => (
                                  <Post key={index} className="group" tw="w-full">
                                    <PostTextContainer >
                                      <Title tw="ml-32">{post.tutorAddressAbrv}</Title>
                                      <InputContainer tw="w-full flex justify-between ml-32" >
                                        <Input id="location-input" tw="flex-col" type="text" name="localtion" placeholder="Location" required />
                                        <SubmitButton onClick={() => this._handleBuyButton(post.tutorAddress, "teste")} >{this._tutorButtonLabel}</SubmitButton>
                                      </InputContainer>                                      
                                    </PostTextContainer>
                                  </Post>
                                  ))}
                                </PostsContainer>
                              </RecentPostsContainer>
                            </Column>
                          </TwoColumn>
                        
                      </div>
                      <SvgDotPattern1 />
                    </FormContainer>
                  </Content>
            </HeroRow>                                             
          </Content2Xl>
        </Container>
        <Footer/>
      </AnimationRevealPage>
    );
  }

  componentWillUnmount() {
    // We poll the user's balance, so we have to stop doing that when Dapp
    // gets unmounted
    this._stopPollingData();
  }

  async _connectWallet() {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Once we have the address, we can initialize the application.

    // First we check the network
    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return this._resetState();
      }
      
      this._initialize(newAddress);
    });
    
    // We reset the dapp state if the network is changed
    window.ethereum.on("chainChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
  }

  _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: userAddress,
    });

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    this._initializeEthers();
    this._getTokenData();
    this._startPollingData();
  }

  async _initializeEthers() {
    // We first initialize ethers by creating a provider using window.ethereum
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    this._token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      this._provider.getSigner(0)
    );

    this._erc1155 = new ethers.Contract(
      contractErc1155Address.Talkaway1155,
      TalkawayERC1155Artifact.abi,
      this._provider.getSigner(0)
    );

    this._erc721 = new ethers.Contract(
      contractErc721Address.TalkawayERC721,
      TalkawayERC721Artifact.abi,
      this._provider.getSigner(0)
    );
  }

  // The next two methods are needed to start and stop polling data. While
  // the data being polled here is specific to this example, you can use this
  // pattern to read any data from your contracts.
  //
  // Note that if you don't need it to update in near real time, you probably
  // don't need to poll it. If that's the case, you can just fetch it when you
  // initialize the app, as we do with the token data.
  _startPollingData() {
    this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);

    // We run it once immediately so we don't have to wait for it
    this._updateBalance();
  }

  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  // The next two methods just read from the contract and store the results
  // in the component state.
  async _getTokenData() {
    const name = await this._token.name();
    const symbol = await this._token.symbol();

    this.setState({ tokenData: { name, symbol } });
  }

  async _updateBalance() {
    const balance = await this._token.balanceOf(this.state.selectedAddress);
    this.setState({ balance });
  }

  async _atualizaTokenMetadata(){

    try {
      this._dismissTransactionError();
      console.log("this.state.selectedAddress", this.state.selectedAddress);
      

      const tx = await this._erc1155.atualizaTokenCheckin().send({ gasLimit: 30000 });      
      this.setState({ txBeingSent: tx.hash });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that made the transaction fail when it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }
      console.log("Nova caminhada criada!");
      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      await this._updateBalance();
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }
    }
  }

  async _criaNovaCaminhada(tutor, localizacao){
    
    try {
      this._dismissTransactionError();
      console.log("this.state.selectedAddress", this.state.selectedAddress);
      console.log("tutor", tutor);
      console.log("localizacao", localizacao);
      

      const tx = await this._erc1155.novaCaminhada(this.state.selectedAddress, tutor, localizacao).send({ gasLimit: 30000 });      
      this.setState({ txBeingSent: tx.hash });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that made the transaction fail when it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }
      console.log("Nova caminhada criada!");
      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      await this._updateBalance();
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }
    }

  }


  // This method sends an ethereum transaction to transfer tokens.
  // While this action is specific to this application, it illustrates how to
  // send a transaction.
  async _transferTokens(to, amount) {
    // Sending a transaction is a complex operation:
    //   - The user can reject it
    //   - It can fail before reaching the ethereum network (i.e. if the user
    //     doesn't have ETH for paying for the tx's gas)
    //   - It has to be mined, so it isn't immediately confirmed.
    //     Note that some testing networks, like Hardhat Network, do mine
    //     transactions immediately, but your dapp should be prepared for
    //     other networks.
    //   - It can fail once mined.
    //
    // This method handles all of those things, so keep reading to learn how to
    // do it.

    try {
      // If a transaction fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.
      this._dismissTransactionError();

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const tx = await this._token.transfer(to, amount);
      this.setState({ txBeingSent: tx.hash });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that made the transaction fail when it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      await this._updateBalance();
    } catch (error) {
      // We check the error code to see if this error was produced because the
      // user rejected a tx. If that's the case, we do nothing.
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      // Other errors are logged and stored in the Dapp's state. This is used to
      // show them to the user, and for debugging.
      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      // If we leave the try/catch, we aren't sending a tx anymore, so we clear
      // this part of the state.
      this.setState({ txBeingSent: undefined });
    }
  }

  // This method just clears part of the state.
  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  // This method just clears part of the state.
  _dismissNetworkError() {
    this.setState({ networkError: undefined });
  }

  // This is an utility method that turns an RPC error into a human readable
  // message.
  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  // This method resets the state
  _resetState() {
    this.setState(this.initialState);
  }

  // This method checks if Metamask selected network is Localhost:8545 
  _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    this.setState({ 
      networkError: 'Please connect Metamask to Localhost:8545'
    });

    return false;
  }

  async _handleBuyButton(tutor, localizacao){ 
    this._transferTokens("0xfd9D169C2c090bb7328f5FefC6AD8C8Df4C7aD13", ethers.utils.parseEther("0.01"));
    this._criaNovaCaminhada(tutor, localizacao);
    this.setState({
      _caminhadaButtonLabel: "Check-out"
    });
  }

  async _handleCheckinButton(tokenAddress, tokenId){
    this._atualizaTokenMetadata(tokenAddress, tokenId);
  }

};
