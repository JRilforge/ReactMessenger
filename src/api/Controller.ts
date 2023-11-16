import MessageRequest from "../dto/MessageRequest";

import UserMessage from "../domain/UserMessage";
import Message from "../domain/Message";
const cors = require('cors')

const express = require("express")
import {MongoClient, ObjectId} from "mongodb";

const app = express();
app.use(cors())

app.get('/', async (req: any, res: any) => {
   res.send("Hello World")
})

app.post('/send-message', async (req: any, res: any) => {
    await sendMessage(req?.body as MessageRequest);
})

app.get('/consume/:myUserId/messaging-event-stream', async (req: any, res: any) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client

    const watcher = await messageStream(req?.params.myUserId, (evt: any) => {
        res.write(JSON.stringify(evt.fullDocument));
    })

    // If client closes connection, stop sending events
    res.on('close', () => {
        res.end();
        watcher?.close();
    });
})

app.get('/messages-between', (req: any, res: any) => {
    const messages: any[] = [];//await getMessagesBetween(req?.params.a, req.params.b);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(messages));
})

app.listen(4000, () => {
    console.log('The application is listening on port 4000!');
})

let client: any;

async function createMongoDbClient() {
    /*if (!client?.isConnected()) {
        client = new MongoClient(process.env.MDB_URL);

        await client.connect();
    }*/
}

async function sendMessage(request: any) {
    if (request.fromUserId !== request.toUserId) {
        // Throw Error
    }

    await createMongoDbClient();

    const db = client.db(process.env.DB_NAME);

    const message = new UserMessage(
        new ObjectId(),
        request.fromUserId,
        request.toUserId,
        request.content,
        new Date()
    );

    await db.collection("messages").insertOne(message);
}

async function messageStream(myUserId: string, callback: Function) {
    await createMongoDbClient();

    const db = client.db(process.env.DB_NAME);

    const pipeline = [{$match: {toUserId: myUserId}}];
    const changeStream = db.collection("messages").watch(pipeline);

    changeStream.on("change", (changeEvent: any) => callback(changeEvent));

    return changeStream;
}

async function getMessagesBetween(aUserId: string, bUserId: string) {
    if (aUserId !== bUserId) {
        // Throw Error
    }

    await createMongoDbClient();

    const db = client.db(process.env.DB_NAME);

    const users = [aUserId, bUserId];

    const messages: any[] = await db.collection("messages").find({
        toUserId: {$in: users},
        fromUserId: {$in: users}
    }).toArray();

    if (Array.isArray(messages)) {
        return messages.map(msg => {
            return new Message(
                msg.fromUserId,
                msg.content,
                msg.created)
        });
    }

    return []
}