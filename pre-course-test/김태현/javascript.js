/*
문제)
아래의 API는 100개의 게시글에 대한 정보를 배열로 받을 수 있는 API입니다.
https://jsonplaceholder.typicode.com/posts

HTTP 통신 라이브러리로 위 API를 호출한 뒤 특정 userId에 해당하는 변수를 다음과 같이 만듭니다.
ex) userId가 1이면 변수 이름은 user1

게시글 정보 중 해당 userId에 해당하는 게시글의 title 정보만 모아 아래와 같이 객체 형태로 저장합니다.
ex) user1 = {
  title1: '',
  title2: '',
  ...
  title10: ''
};
*/

/*
ex) API 예시
[
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  }
  ...
]
*/

/*
ex) 답안 예시
userId가 1인 게시글의 제목을 객체에 모두 저장
var user1 = {
  title1: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  title2: "qui est esse",
  ...
}

var user2 = {
  title1: ...,
  title2: ...
}
*/

// TODO: 아래에 답안을 작성해주세요.

$(document).ready(function() {
  window.board = new BoardController();
});

class BoardController {
  constructor() {
    this.articles = [];
    this.data = null;

    this.getData();
  }

  run() {
    if (this.data == null) {
      alert('data is null.');
    }

    this.getTitlesByFor(1);
    this.getTitlesByArrayForEach(2);
    this.getTitlesByArrayReduce(3);
    this.getTitlesByCurrying(4);
  }

  getData() {
    let $this = this;
    this.read()
    .then(function(data) {
      console.log('success!');
      $this.data = data;
    })
    .catch(function(err) {
      console.log('catch: ' + err);
    });
  }

  read() {
    return new Promise(function (resolve, reject) {
      $.get('https://jsonplaceholder.typicode.com/posts', function(res) {
        if (res) {
          resolve(res);
        }
        else {
          reject(new Error("Request is failed"));
        }
      });
    });
  }

  getTitlesByFor(userId) {
    let idx = 1;
    window["user" + userId] = {};

    for (var i in this.data) {
      if (this.data[i].userId === userId) {
        window["user" + userId]["title" + idx] = this.data[i].title;
        idx++;
      }
    }
  }

  getTitlesByArrayForEach(userId) {
    let idx = 1;
    window["user" + userId] = {};
    
    this.data.forEach(function(n){
      if (n.userId === userId) {
        window["user" + userId]["title" + idx] = n.title;
        idx++;
      }
    });
  }

  getTitlesByArrayReduce(userId) {
    let idx = 1;
    window["user" + userId] = this.data.reduce(function(pre, val){
      if (val.userId === userId) {
        pre["title" + idx] = val.title;
        idx++;
      }
      return pre;
    }, {});
  }

  getTitlesByCurrying(sIdx) {
    let curried
  }


}

function curry(fn) {
  var arity = fn.length;

  return (function resolver() {
    var memory = Array.prototype.slice.call(arguments);
    return function() {
      var local = memory.slice();
      Array.prototype.push.apply(local, arguments);
      next = local.length >= arity ? fn : resolver;
      return next.apply(null, local);
    };
  }());
}
