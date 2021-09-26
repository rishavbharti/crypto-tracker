const aws = require("aws-sdk");
const Table = require("cli-table3");

aws.config.loadFromPath("./config.json");

const TABLE_NAME = process.argv[2];

if (!TABLE_NAME) {
  console.log(
    "\nPlease add the table name to TABLE_NAME variable in db-viewer.ts\n"
  );
  process.exit();
}

function getKeys(items) {
  return items.reduce((prev, curr) => {
    Object.keys(curr).forEach((val) => !prev.includes(val) && prev.push(val));
    return prev;
  }, []);
}

function getRow(allKeys, item) {
  return allKeys.map((key) =>
    item[key] instanceof Object ? JSON.stringify(item[key], null, 3) : item[key]
  );
}

(async () => {
  const dynamodb = new aws.DynamoDB.DocumentClient();
  const response = await dynamodb
    .scan({
      TableName: TABLE_NAME,
    })
    .promise();

  if (response?.$response?.data?.Items?.length > 0) {
    const items = response.$response.data.Items;
    const keys = getKeys(items);
    const table = new Table({
      head: keys,
    });
    response.$response.data.Items.forEach((element) => {
      table.push(getRow(keys, element));
    });

    console.log(table.toString());
  } else {
    console.log("\nNo rows found in this table.\n");
  }
})();
