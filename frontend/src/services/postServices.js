import httpServices from "./httpservices";

export function createPost(post) {
  return httpServices.post("/post", post);
}
export function getAllPosts() {
  return httpServices.get("/post/allPosts");
}

export function getMyPosts() {
  return httpServices.get("/post/userPosts");
}

export function getLikedPosts(id) {
  return httpServices.get(`/post/likedPosts/${id}`);
}

export async function manageLike(post_id, isLiked) {
  try {
    const response = await httpServices.put(`/post/like/${post_id}`, {
      isLiked,
    });
    return response;
  } catch (err) {
    return err;
  }
}

export async function postComment(post_id, comment) {
  try {
    const response = await httpServices.put(`/post/comments/${post_id}`, {
      comment,
    });
    return response;
  } catch (err) {
    return err;
  }
}

export async function getAllComments() {
  try {
    const response = await httpServices.get("/post/allComments");
    return response;
  } catch (err) {
    return err;
  }
}

export function getUserPosts(id) {
  return httpServices.get(`/post/${id}`);
}
const postServices = {
  createPost,
  getAllPosts,
  getMyPosts,
};
export default postServices;
