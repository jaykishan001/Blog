import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

//we are creating a service for authentication

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURl)
            .setProject(conf.appwriteProjectId);
        
            this.account = new Account(this.client);  
    }
    //we don't want dependiencies so we create a methdo which is working like a wrapper in this we call all services
    //async function are used that take some time to complete this async function return the promise
    // await is used to pause the execution of the async function

    async createAccount({ email, password}) {
      
        try {
        const userAccount =  await this.account.create(ID.unique(), email, password)
        if(userAccount) {
            //if the account is created we directly pass the login the user by call new function
            return this.login({email, password});
        }
        else {
            return userAccount;
        }
       } catch (error) {
        throw error;
       }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);   
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
    // if we are on home page we need to check are we login or not 
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }
        return null;
    }


}
// created a object so that we can directly access the methods 
const authService = new AuthService();
export default authService;