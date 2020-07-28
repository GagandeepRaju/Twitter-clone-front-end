import http from "./httpservices";

const apiEndpoint = "/homepage";

//
export function getPosts(postedBy) {
  return http.get(apiEndpoint + `/allposts/${postedBy}`);
}

//http://localhost:3100/api/homepage/addpost/:userid
export function addPost(postedBy, text) {
  return http.post(apiEndpoint + `/addpost/${postedBy}`, {
    text: text,
    postedBy: postedBy
  });
}

//http://localhost:3100/api/homepage/addcomment/
export function addComment(data) {
  return http.put(apiEndpoint + `/addcomment`, data);
}

//http://localhost:3100/api/homepage/removecomment/
export function deleteComment(commentId, postId) {
  console.log(commentId, postId);
  return http.put(apiEndpoint + `/removecomment`, {
    commentId: commentId,
    postId: postId
  });
}

//http://localhost:3100/api/homepage/addlike/postid
export function addLike(postid) {
  return http.put(apiEndpoint + `/addlike/${postid}`);
}

//
export function removeLike(postid) {
  return http.put(apiEndpoint + `/removelike/${postid}`);
}

//http://localhost:3100/api/homepage/deletepost/:postid
export function deletePost(postid) {
  return http.delete(apiEndpoint + `/deletepost/${postid}`);
}
