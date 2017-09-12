const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
const secret = process.env.SESSION_SECRET || 'ssh it\'s a secret';

module.exports = { port, dbURI, secret };
