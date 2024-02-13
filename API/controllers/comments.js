const blogSchema = require("../models/Blogs");
const commentSchema = require("../models/Comments");
module.exports = {
    sendComment : async(req ,res , next) => {
        try{
            console.log("H")
            const {id} = req.params; //authors id
            const {parentId , postId} = req.query;
            const {data} = req.body;
            // console.log(data , parentId , postId , id);
            if(parentId){
                //this is a reply comment
                const comment = new commentSchema({author : id , data});
                const savedComment = await comment.save();
                // const parentC = await commentSchema.findById(parentId)
                const parentCommentEdited = await commentSchema.findByIdAndUpdate({_id : parentId} , {$push : {replies  : savedComment._id}} , {new : true});
                return res.send({success : true , parent : parentCommentEdited});
            }
            else{
                //First level comment
                const comment = new commentSchema({author : id , data});
                const savedComment = await comment.save();
                const updatedPost = await blogSchema.findByIdAndUpdate({_id : postId} , {$push : {comments : savedComment._id}} , {new : true});
                return res.send({success : true  , parent : updatedPost})
            }
        }
        catch(e){
            next(e);
        }
    } , 
    likeComment : async(req , res , next) => {
        try{
            const {_id} = req.user;
            const {commentId} = req.params;
            const NewCommentData = await commentSchema.findByIdAndUpdate({_id : commentId} , {$push : {likes : _id}} , {new : true});
            res.send({success : true , comment  : NewCommentData});
        }
        catch(e){
            next(e);
        }
    },
    deleteComment : async(req,res , next) => {
        try{
            const {_id} = req.user;
            const {commentId} = req.params;
            const {postId} = req.query;
            const actualAuthor = await commentSchema.findById(commentId)
            console.log("Inside delete comment")
            console.log(actualAuthor)
            const isAuthor = (_id.equals(actualAuthor.author._id));
            console.log(isAuthor)
            if(isAuthor){
                if(postId){
                    const postWithRemovedComment = await blogSchema.findByIdAndUpdate({_id : postId} , {$pull : {comments : {_id : commentId}}} , {new : true});
                }
                const removedReplies = await commentSchema.findByIdAndDelete(commentId);   
                res.send("Hel")
            }
            else{
                throw new Error("You are not authorized to delete this comment");
            }
        }
        catch(e){
            next(e);
        }
    },
    fetchComment : async(req , res , next) => {
        try{
            const {postId} = req.params;
            const data = await blogSchema.findById(postId);
            console.log("herein" , data.comments)
            res.send({success : true , comment : data.comments});
        }catch(e){
            next(e);
        }
    }
}