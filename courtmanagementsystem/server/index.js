import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import causeListRoutes from './routes/causeLists.js';
import casesRoutes from './routes/cases.js';

const app = express();

app.use('/posts', postRoutes);
app.use('/causeLists', causeListRoutes);
app.use('/cases', casesRoutes);


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://Usman:root@cluster0.sh6gppr.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server runnng on port: ${PORT}`)))
    .catch(() => console.log(error.message));

// mongoose.set('useFindAndModify', false);


