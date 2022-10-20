import { useParams } from "react-router-dom";

const data = {
  velopert: {
    name: "김민준",
    description: "리액트를 좋아하는 개발자",
  },
  gildong: {
    name: "홍길동",
    description: "고전 소설 주인공",
  },
};

const Profile = () => {
  /* URL 파라미터는 useParams라는 Hook을 사용해 객체 형태로 조회 가능 */
  const params = useParams();
  /*username URL 파라미터를 통하여 프로필을 조회*/
  const profile = data[params.username];
  console.log("data[params]", data[params]);
  console.log("profile", profile);
  return (
    <div>
      <h1>사용자 프로필</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다.</p>
      )}
    </div>
  );
};
export default Profile;
