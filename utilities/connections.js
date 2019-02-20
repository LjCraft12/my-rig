let dbName = 'killerRig';

module.exports = {
    server: {
        port: process.env.PORT || 3000
    },
    database: {
        databaseConnectionUrl: `mongodb+srv://inventoryApi:onClickAdmin2018@university-brzxn.mongodb.net/${dbName}?retryWrites=true`,
        mongoDBSession: {
            connect: `mongodb+srv://inventoryApi:onClickAdmin2018@university-brzxn.mongodb.net/${dbName}`,
        }
    },
    sessionOptions: {
        secret: 'CBAB340E4E'
    }
};