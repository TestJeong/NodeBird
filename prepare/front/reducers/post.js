export const init = {
  mainPosts: [
    {
      id: 1,

      User: {
        id: 1,
        nickname: "제로초",
      },

      content: "첫 번째 게시글 #해시태그 #익스프레스",

      Images: [
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
      ],

      Comments: [
        {
          User: { nickname: "nero" },
          content: "우와 개정판이 나왔군요",
        },
        {
          User: { nickname: "Yun" },
          content: "두근 두근  하네요",
        },
      ],
    },
  ],
  imagePaths: [], // 이미지 주소
  postAdded: false, // 게시글 추가가 완료되면 true로 변경
};

const ADD_POST_REQUEST = "ADD_POST_REQUEST";
const ADD_POST_SUCCES = "ADD_POST_SUCCES";
const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: "더미데이터 입니다",
  User: {
    id: 1,
    nickname: "ZeroCh",
  },
  Images: [],
  Comments: [],
};

//User, Image, Comments 이렇게 대문자를 쓴 이유는 다른 정보와 합쳐주기 때문에

const reducer = (state = init, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts], //dummyPost를 앞에 추가해야 최신 포스터가 제일 위에 있음
        postAdded: true,
      };

    default:
      return state;
  }
};

export default reducer;
