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
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
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
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts], //dummyPost를 앞에 추가해야 최신 포스터가 제일 위에 있음
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
