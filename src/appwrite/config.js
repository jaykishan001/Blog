import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Service {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteURl)
        .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }
    // we are using await keyword to wait promise to resolve
    // if the document is successfully created, the result of that operation is returned as a promise.
    
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage,
                    status, 
                    userId,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title,content, featuredImage,status}) {
        
        try {
           return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )   
        } catch (error) {

           throw error; 

        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug
            )
            //returning true that documnet is deleted succesfully
            return true;
        } catch (error) {
            console.log("appwrite error delete post :: ", error);
            return false;
        }
    }

    async getpost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("get possst error::" , error);
            return false;
        }

    }

    async getPosts(queryes = [Query.equal("status", "active")] ){
        try {
            return await this.database(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                queryes
            )
        } catch (error) {
            console.log("error allpost::", error);
            return false;
        }
    }
    //upload files service passing actual file in parameter
    
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBuketId,
                ID.unique(),
                file
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBuketId,
                fileId
            )
            return true
            
        } catch (error) {
            console.log(error);
            return false
        }
    }

    getPreview(fileId) {
        
            return this.storage.getPreview(
                conf.appwriteBuketId,
                fileId
            )
    
    }

}
const service = new Service();
export default service;
