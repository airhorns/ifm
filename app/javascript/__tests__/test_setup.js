const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");

process.env.NODE_ENV = "test";
// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
