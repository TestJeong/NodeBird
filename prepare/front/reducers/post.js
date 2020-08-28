export const init = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Image: [
        { src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg" },
      ],

      Comments: [
        {
          User: { nickname: "nero" },
          content: "우와 개정판이 나왔군요",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

//User, Image, Comments 이렇게 대문자를 쓴 이유는 다른 정보와 합쳐주기 때문에

const reducer = (state = init, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
