import setFeatures from 'feature-toggle';

// This will set the list of currently active
// features, and add the feature classes to the
// body element. It will take url parameters
// into account:

const features = [];

if (process.env.NODE_ENV === 'development') {
  features.push('use-local-graphql');
}

//or add ?ft=use-local-graphql to the url

export default setFeatures(features);
