import http from "./httpservices";

const apiEndpoint = "/";

//register new user
export function register(user) {
  return http.post(apiEndpoint + "user", {
    name: user.name,
    email: user.email,
    password: user.password
  });
}

//http://localhost:3100/api/homepage/usertofollow
export function getUsers(userid) {
  return http.get(apiEndpoint + "homepage/usertofollow/" + userid);
}

//http://localhost:3100/api/user/5e62dcb08f4e1022c057baf4
export function getthisUserDetails(userid) {
  return http.get(apiEndpoint + `user/${userid}`);
}

//http://localhost:3100/api/user/editprofile
export function editProfile(formdata, userid) {
  const config = {
    headers: { "content-type": "multipart/form-data" }
  };
  return http.put(apiEndpoint + `user/editprofile/${userid}`, formdata, config);
}

//http://localhost:3100/api/user/profile/5e62dcb08f4e1022c057baf4
export function userProfile(userid) {
  return http.get(apiEndpoint + `user/profile/${userid}`);
}

//http://localhost:3100/api/homepage/addfollowing/5e62dcbc8f4e1022c057baf5
export function addFollowing(userid, myid) {
  const body = { _id: myid };
  return http.put(apiEndpoint + `homepage/addfollowing/${userid}`, body);
}

//http://localhost:3100/api/homepage/removefollowing/5e722edadaecf64710b43ea7
export function removeFollowing(userid, myid) {
  const body = { _id: myid };
  return http.put(apiEndpoint + `homepage/removefollowing/${userid}`, body);
}

//http://localhost:3100/api/user/5e51f6e9ddcc564828b39867
export function deleteUser(userid) {
  return http.delete(apiEndpoint + `user/${userid}`);
}

//http://localhost:3100/api/user/photo/5e723170daecf64710b43eac
export function photoUrl(userid) {
  const baseUrl = process.env.REACT_APP_API_URL + "/user/photo/";
  return baseUrl + `${userid}`;
}
