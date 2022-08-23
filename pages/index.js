import { useMoralis, useMoralisQuery } from "react-moralis";
import NFTBox from "../components/NFTBox";

export default function Home() {
  // How to show the recently listed NFTs?
  // => index the events off-chain and then read from the database
  // => setup a server to listen for events to be fired, and add them to a database to query

  // 2 ways:
  // Moralis: more centralized, but comes with many features
  // TheGraph: decentralized way

  // table name: ActiveItem
  // function for the query
  const {
    data: listedNfts,
    isFetching,
    fetchingListedNfts,
  } = useMoralisQuery("ActiveItem", (query) =>
    query.limit(10).descending("tokenId")
  );
  console.log(listedNfts);

  const { isWeb3Enabled } = useMoralis();

  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          fetchingListedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.map((nft) => {
              console.log(nft.attributes);
              const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                nft.attributes;

              return (
                <div className="m-2">
                  <NFTBox
                    price={price}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    marketplaceAddress={marketplaceAddress}
                    seller={seller}
                    key={`${nftAddress}${tokenId}`}
                  />
                </div>
              );
            })
          )
        ) : (
          <div>Web3 currently not enabled!</div>
        )}
      </div>
    </div>
  );
}
