export default `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`;
