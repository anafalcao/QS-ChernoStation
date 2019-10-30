import { client } from '../index';
import { gql } from "apollo-boost";

export default class User {
    static async getUsers() {
        return client
        .query({
            query: gql`
            {
                allUsers {
                    nodes {
                    email
                    id
                    name
                    passwordHash
                    username
                    nodeId
                    }
                }
            }
            `
        });
    }

}