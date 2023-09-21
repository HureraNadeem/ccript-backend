const  mongoose = require('mongoose');

// const ConnectionOptions: ConnectOptions = {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }

function establishDBConnection(DB){
	mongoose
		.connect(DB)
		.then((con) => {
			console.log('DB connected sir!!!');
		})
		.catch((err) => console.log(err));
}

module.exports = establishDBConnection;
