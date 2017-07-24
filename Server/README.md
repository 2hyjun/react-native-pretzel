CREATE DATABASE pretzel CHARACTER SET utf8 COLLATE utf8_general_ci;
============================================================
CREATE TABLE users (
    user_email VARCHAR(50) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    user_password CHAR(88) NOT NULL,
    user_univ VARCHAR(50) NOT NULL,
    user_major VARCHAR(50) NOT NULL,
    primary key(user_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
============================================================
ALTER TABLE users MODIFY user_password CHAR(88) NOT NULL;
============================================================
CREATE TABLE timeline(
    user_email VARCHAR(50) NOT NULL,
    content VARCHAR(50) NOT NULL,
    detailInfo TEXT(100) NOT NULL,
    expectedPrice int(5) UNSIGNED NOT NULL,
    fee int(5) UNSIGNED NOT NULL,
    deadline DATETIME NOT NULL,
    rid int(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    contentType VARCHAR(30) NOT NULL,
    completed VARCHAR(5) NOT NULL,
    title VARCAHR(50) NOT NULL,
    time DATETIME NOT NULL,
    place VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
============================================================
url & result forms

자동로그인 확인( 매 실행 때 마다 체크 )
'/' (Get 방식)

    - 자동로그인 시
        response:
            { resultCode: 100 }
    - 자동로그인 실패 (최초 로그인, 기간 만료): 로그인필요.
        response: 
            { resultCode: 1 }
로그아웃
'/logout' (Get 방식)

    - 로그아웃
        response: 'logout success'
        실패사항 정의 안했음 아마 실패상황 없을 것임.

로그인
'/login' (Post 방식)
    body parameter: ['email', 'password']
    - 동일 email 찾기 SQL QUERY err(db에러)
        response: {
            resultCode: 1,
            result: err (MYSQL에서 제공하는 ERROR 정보 객체)
        }
    - 동일 email 없음.
        response: {
            resultCode: 2,
            result: 'No such ID'
        }
    - 아이디는 맞으나, 비밀 번호 틀림
        response: {
            resultCode: 3,
            result: 'Wrong Password'
        }
    - body parameter(email, password 없음)
        response: {
            resultCode: 4,
            result: 'No Body Parameters'
        }
    - 로그인 성공
        response: {
            resultCode: 100,
            result: 로그인 된 사용자 정보(세션으로 저장됨.)
        }

회원 가입
'/register' (Post 방식)
    body parameter: [email, name, password, univ, major]
    - 이미 사용된 이메일
        response: {
            resultCode: 1,
            result: 'Duplicated Email'
        }
    - 그 외의 에러
        response: {
            resultCode: 2,
            result: err (MYSQL에서 제공하는 에러정보 객체)
        }
    - 회원가입 성공
        response: {
            resultCode: 100,
            result: 'Register Success'
        }
    - Body Parameter 없음
        response: {
            resultCode: 3,
            result: 'No Body Parameters'
        }
timeline 검색.
'/timeline' (Get 방식)
    - timeline 검색 실패
        response: {
            resultCode: 1,
            result: err
        }
    - timeline 검색 성공
        response: {
            resultCode: 100,
            result: timeline 목록 객체 배열
        }
글 쓰기 요청.
'/timeline/new_request'(Post 방식)
    body parameter: [title, content, detailInfo, expectedPrice, 
                fee, deadLine, type] (철자 조심!)
    deadLine 형식: yyyy-mm-dd hh:mm:ss
    - 글 쓰기 실패
        response: {
            resultCode: 1,
            result: err
        }
    - 글 쓰기 성공
        response: {
            resultCode: 100,
            result: 글 쓰기 성공 정보 객체
        }
글 삭제 요청 
'/timeline/delete/id(query parameter)' id에 한 게시글의 rid값(Get 방식)
    - 글 삭제 실패(권한 없음)
        response: {
            resultCode: 1,
            result: 'Permission Denied'
        }
    - 글 삭제 MYSQL ERROR(해당 게시글 검색)
        response: {
            resultCode: 3,
            result: err
        }
    - 글 삭제 MYSQL에서 실패(삭제 요청)
        response: {
            resultCode: 2,
            result: err
        }
    - 글 삭제 성공
        response: {
            resultCode: 100,
            result: 글 삭제 성공 정보 객체
        }
    
글 수정 요청
'timeline/update/id(query parameter)' id에 한 게시글의 rid값
(Post 방식)
    body parameter:[title, content, detailInfo, expectedPrice, fee, deadLine] 철자조심!
    deadLine 형식: yyyy-mm-dd hh:mm:ss
    - 글 수정 실패(url에 id parameter없음)
        response: {
            resultCode: 1,
            result: 'No id parameter'
        }
    - 글 수정 실패 (MYSQL상의 에러, 게시물 검색 할 때)
        response: {
            resultCode: 2,
            result: err
        }
    - 글 수정 실패(권한 없음)
        reponse: {
            resultCode: 3,
            result: 'Permission Denied'
        }
    - 글 수정 실패(Body Parameter 부족)
        response: {
            resultCode: 4,
            result: 'No Body Parameters'
        }
    - 글 수정 실패(MYSQL상의 에러, 수정 요청 할 때)
        response: {
            resultCode: 5,
            result: err
        }
    - 글 수정 실패(rid값에 맞는 글이 없음.)
        response: {
            resultCode: 6,
            result: 'No such things that rid=' + rid
        }
    - 글 수정 성공
        response: {
            resultCode: 100,
            result: 수정 성공 정보 객체
        }
내 정보 요청
'/mypage' (Get 방식)

    - 내가 쓴 글 검색 실패(MYSQL상의 에러)
        response: {
            resultCode: 1,
            result: err,
            myInfo: undefined
        }
    - 성공
        response: {
            resultCode: 100,
            result: 내가 쓴 글 배열,
            myInfo: 내 정보

        }
