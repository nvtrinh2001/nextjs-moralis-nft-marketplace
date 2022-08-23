// Create a new table called "ActiveItem"
// Add items when they are listed on the marketplace
// Remove them when they are bought or cancelled

// anytime something is saved, do something
Moralis.Cloud.afterSave("ItemListed", async (request) => {
  // every event gets triggered twice, once on unconfirmed, again on confirmed
  const confirmed = request.object.get("confirmed");
  const logger = Moralis.Cloud.getLogger();
  logger.info("Looking for confirmed transaction...");

  if (confirmed) {
    logger.info("Found Item!");
    // if table ActiveItem exists => grap it
    // if not, create one
    const ActiveItem = Moralis.Object.extend("ActiveItem");
    const activeItem = new ActiveItem();

    // Check if it exists
    const query = new Moralis.Query(ActiveItem);
    query.equalTo("marketplaceAddress", request.object.get("address"));
    query.equalTo("nftAddress", request.object.get("nftAddress"));
    query.equalTo("tokenId", request.object.get("tokenId"));
    query.equalTo("seller", request.object.get("seller"));
    const alreadyListedItem = await query.first();

    if (alreadyListedItem) {
      logger.info(
        `Deleting older version of item with tokenId ${request.object.get(
          "tokenId"
        )} at address ${request.object.get("address")}`
      );
      await alreadyListedItem.destroy();
      logger.info("Older version deleted!");
    }

    activeItem.set("marketplaceAddress", request.object.get("address"));
    activeItem.set("nftAddress", request.object.get("nftAddress"));
    activeItem.set("price", request.object.get("price"));
    activeItem.set("tokenId", request.object.get("tokenId"));
    activeItem.set("seller", request.object.get("seller"));
    logger.info(
      `Adding address: ${request.object.get(
        "address"
      )}, tokenId: ${request.object.get("tokenId")}`
    );
    logger.info("Saving...");
    await activeItem.save();
    logger.info("Saved!");
  }
});

Moralis.Cloud.afterSave("ItemCancelled", async (request) => {
  const confirmed = request.object.get("confirmed");
  const logger = Moralis.Cloud.getLogger();
  logger.info(`Marketplace | Object: ${request.object}`);
  if (confirmed) {
    const ActiveItem = Moralis.Object.extend("ActiveItem");
    const query = new Moralis.Query(ActiveItem);
    query.equalTo("marketplaceAddress", request.object.get("address"));
    query.equalTo("nftAddress", request.object.get("nftAddress"));
    query.equalTo("tokenId", request.object.get("tokenId"));
    logger.info(`Marketplace | Query: ${query}`);
    const cancelledItem = await query.first();
    logger.info(`Marketplace | CancelledItem: ${cancelledItem}`);
    if (cancelledItem) {
      logger.info(
        `Deleting ${request.object.get(
          "tokenId"
        )} at address ${request.object.get("address")} as it's got cancelled...`
      );
      await cancelledItem.destroy();
    } else {
      logger.info(
        `Item with address ${request.object.get(
          "address"
        )} and tokenId ${request.object.get("tokenId")} cannot be found!`
      );
    }
  }
});

Moralis.Cloud.afterSave("ItemBought", async (request) => {
  const confirmed = await request.object.get("confirmed");
  const logger = Moralis.Cloud.getLogger();
  logger.info(`Marketplace | Object: ${request.object}`);
  if (confirmed) {
    const ActiveItem = Moralis.Object.extend("ActiveItem");
    const query = new Moralis.Query(ActiveItem);
    query.equalTo("marketplaceAddress", request.object.get("address"));
    query.equalTo("nftAddress", request.object.get("nftAddress"));
    query.equalTo("tokenId", request.object.get("tokenId"));
    logger.info(`Marketplace | Query: ${query}`);
    const boughtItem = await query.first();
    if (boughtItem) {
      logger.info(`Deleting ${request.object.get("objectId")}`);
      await boughtItem.destroy();
      logger.info(
        `Item with tokenId ${request.object.get(
          "tokenId"
        )} at address ${request.object.get("address")} has been deleted!`
      );
    } else {
      logger.info(
        `Item with tokenId ${request.object.get(
          "tokenId"
        )} at address ${request.object.get("address")} cannot be found!`
      );
    }
  }
});
