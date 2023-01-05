const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Victor:Welcome22@cluster0.waa6iem.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // fazer algo com a coleção
  client.close();
});

module.exports = {
  MongoClient,
};

