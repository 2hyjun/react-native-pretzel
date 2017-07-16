1. Git 설치 url http://msysgit.github.com/
2. 설치 옵션 다 기본값으로.
3. Git Bash 실행
4. 원하는 경로로 이동.
	(명령어: cd (경로) ex 바탕화면: cd ~/Desktop/)
5. 폴더 생성
	*(명령어: mkdir (폴더이름) ex. mkdir summertime-pretzel)
6. git init
7. git config --global user.name '유저네임 (id 아님)'
	*(ex git config --global user.name '2hyjun')
8. git config --global user.email '이메일'
	*(ex. git config --global user.email'biper94@gmail.com')
9. git remote add origin https://github.com/2hyjun/summertime-pretzel.git
						설정
------------------------------------------------------------------------------------
					설정 완료했으면 이후엔 아래 부터.
10. git pull origin master 
	(Git에 파일 올리기 전에는 먼저 다운을 받고 나서 올려야함.)
11. git add .
	(임시 저장소에 추가.)
	('.'점 꼭있어야함. 현재 폴더 아래의 모든 파일을 추가한다는 뜻.)
12. git commit -m '메시지'
	(ex. git commit -m 'DB modified 07.17 by 이혁준')
13. git push -u origin master
	Git에 올리기.
끗!


