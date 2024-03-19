const express = require('express');
const router = express.Router();
const SellingPartner = require('amazon-sp-api');
const fs = require('fs');
const path = require('path');

const tempFolderPath = path.join(__dirname, '..', 'temp');

const writeFile = (fileName, data) => {
  fs.writeFileSync(path.join(tempFolderPath, fileName), JSON.stringify(data, null, 2));
};

const createSpClient = async () => {
  return new SellingPartner({
    region: 'eu',
    refresh_token: process.env.AMZN_ACCESS_TOKEN,
    options: {
      auto_request_tokens: true,
      use_sandbox: false,
      only_grantless_operations: false,
    },
    credentials: {
      SELLING_PARTNER_APP_CLIENT_ID: process.env.SELLING_PARTNER_APP_CLIENT_ID,
      SELLING_PARTNER_APP_CLIENT_SECRET: process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
    },
  });
};

router.get('/ping', async (req, res) => {
  try {
    const sellerId = process.env.AMZN_MERCHANT_TOKEN;
    const marketplaceId = process.env.AMZN_MARKETPLACE_ID;
    const asin = process.env.AMZN_ASIN_EXAMPLE;
    const sp = await createSpClient();

    // get product details by asin
    //TODO: if (getListingItem.items.length > 0), than user must select the which product to use
    const getListingItem = await sp.callAPI({
      operation: 'catalogItems.searchCatalogItems',
      query: {
        marketplaceIds: [marketplaceId],
        identifiers: [asin],
        identifiersType: 'ASIN',
        includedData: ['attributes', 'dimensions', 'identifiers', 'images', 'productTypes', 'summaries'],
        pageSize: 1,
        // sellerId: process.env.SELLER_ID,
      },
      options: {
        version: '2022-04-01',
      },
    });
    writeFile('getListingItem.json', getListingItem);
    console.log('getListingItem response');

    //TODO: if product types length is greater than 1, than user must select the which product type to use
    let productTypes = [];
    for (const item of getListingItem.items) {
      productTypes = [...productTypes, ...item.productTypes];
    }

    // Restrictions for the product
    const getListingsRestrictions = await sp.callAPI({
      operation: 'listingsRestrictions.getListingsRestrictions',
      query: {
        marketplaceIds: [marketplaceId],
        asin: asin,
        sellerId: sellerId,
        conditionType: 'new_new',
      },
      options: {
        version: '2021-08-01',
      },
    });
    writeFile('getListingsRestrictions.json', getListingsRestrictions);
    console.log('getListingsRestrictions response');

    const getDefinitionsProductType = await sp.callAPI({
      operation: 'productTypeDefinitions.getDefinitionsProductType',
      path: {
        productType: productTypes[0].productType,
      },
      query: {
        marketplaceIds: [marketplaceId],
        sellerId: sellerId,
      },
      options: {
        version: '2020-09-01',
      },
    });
    writeFile('getDefinitionsProductType.json', getDefinitionsProductType);
    console.log('getDefinitionsProductType response');

    res.json({
      status: 200,
      message: 'Welcome to the DnD Api',
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
