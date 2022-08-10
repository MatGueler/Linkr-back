import connection from "../database/database.js";

async function getTagsByPostId(id){
    return connection.query(`SELECT hashtags.name FROM hashtags JOIN hashtags_posts ON hashtags_posts."hashtagId" = hashtags.id JOIN posts ON posts.id = hashtags_posts."postId" WHERE posts.id = $1`,[id]);
}

async function getTrends(){
    return connection.query(`SELECT hashtags.name, COUNT(posts.id) AS "postNumbers" FROM hashtags JOIN hashtags_posts ON hashtags_posts."hashtagId" = hashtags.id JOIN posts ON posts.id = hashtags_posts."postId" GROUP BY hashtags.name ORDER BY "postNumbers" DESC LIMIT 10`);
}


export const hashTagsRepository = {
    getTagsByPostId,
    getTrends
}