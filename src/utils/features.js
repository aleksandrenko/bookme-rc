const setFeatures = require('feature-toggle');

// This will set the list of currently active
// features, and add the feature classes to the
// body element. It will take url parameters
// into account:
var features = setFeatures(['use-local-graphql']);

export default features;
