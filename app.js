const express = require('express');
const cors = require('cors');
const connection = require('./utils/db-connection');
const {Slot, Meeting} = require('./models');
const path = require('path');
const meetingRoutes = require('./routes/meetingRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(meetingRoutes);

async function startServer() {
    try{
        await connection.sync();

        const count = await Slot.count();
        if(count===0){
            await Slot.bulkCreate([
                { time: '2:00 PM', meetingLink: 'https://meet.google.com/syj-gsmp-rco' },
                { time: '2:30 PM', meetingLink: 'https://meet.google.com/abc-defg-hij' },
                { time: '3:00 PM', meetingLink: 'https://meet.google.com/syj-cvrt-nio' },
                { time: '3:30 PM', meetingLink: 'https://meet.google.com/xyz-klmn-opq' }
            ]);
        }

        app.listen(3000, ()=>{
            console.log('server is running...');
        });
    }catch(err){
        console.log(err);
    }
}

startServer();

